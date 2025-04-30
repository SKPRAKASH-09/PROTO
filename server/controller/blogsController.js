const BLOG = require("../models/blog")
const USER = require("../models/user")
const jwt = require("jsonwebtoken")
//fetch all blogs

exports.fetchAllBlogs = async () => {
    try {
        const blogs = await BLOG.find().sort({createdAt: -1 });
    } catch (error) {
        return res.status(500).json({ success:false, message: "Server Error" });
    }
}

// fetch latest news
exports.fetchLatestNews = async (req, res) => {
    try {
        const blogs = await BLOG.find().sort({createdAt: -1 }).limit(5);
        return res.status(200).json({ success:true, blogs });
    } catch (error) {
        return res.status(500).json({ sucess:false, message: "Server Error" });
    }
}

//get description by id
exports.getDescById = async (req, res) => {
    try {
        const token = req.cookies.blogsapptcm
        let user = null;
        if(token){
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET)        
                user = await USER.findById(decoded.id)
            } catch (error) {
                console.log("invalid token")
            }
        }
        
        console.log(id);
        const blog = await BLOG.findById(id);
        if (!blog) {
            return res.status(400).json({ error: "Blog not found" });
        }
        let favourite = false
        if (user &&  blog.favouriteBlogsByUsers.includes(user._id)) {
           favourite = true
        }
        return res.status(200).json({ sucess:true, blog, favourite });
    } catch (error) {
        return res.status(500).json({ sucess:false, message: "Server Error" });
    }
}

//add blogs to favourite
exports.addBlogsToFavourite = async(req, res) => {
    try {
        const { user } = req;
        const { id } = req.params;
        const blog = await BLOG.findById(id);
        const existinguser = await USER.findById(user._id);
        if (!blog) {
            return res.status(400).json({ error: "Blog not found" });
        }
        blog.favouriteBlogsByUsers.push(user._id);
        existinguser.favouriteBlogs.push(id);
        await blog.save();
        await existinguser.save();
        res.status(200).json({sucess: true , message : " blog added to favourites"});
    } catch (error) {
        return res.status(500).json({ sucess:false, message: "Server Error" });
    }
}

//remove blogs from favourites
exports.removeBlogsFromFavourite = async(req, res) => {
    try {
        const { user } = req;
        const { id } = req.params;
        const blog = await BLOG.findById(id);
        const existinguser = await USER.findById(user._id);
        if (!blog) {
            return res.status(400).json({ error: "Blog not found" });
        }
        const userFavouriteIndex = existinguser.favouriteBlogs.indexOf(id);
        if (userFavouriteIndex !== -1){
            existinguser.favouriteBlogs.splice(userFavouriteIndex, 1);
        } else {
            return res.status(400).json({error: "blog is not in favourites"})
        }
        const blogFavouriteIndex = existinguser.favouriteBlogsByUsers.indexOf(id);
        if (blogFavouriteIndex !== -1){
            existinguser.favouriteBlogsByUsers.splice(blogFavouriteIndex, 1);
        }
         
        await blog.save();
        await existinguser.save();
        res.status(200).json({sucess: true , message : " blog removed from favourites"});
    } catch (error) {
        return res.status(500).json({ sucess:false, message: "Server Error" });
    }
}

//edit a particular Blogs
exports.editBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const {title,description} = req.body
        await BLOG.findByIdAndUpdate(id, { title, description});
        
        res.status(200).json({sucess: true , message : " blog updated"});
    } catch (error) {
        return res.status(500).json({ sucess:false, message: "Server Error" });
    }
}
 
//delete a blog
exports.deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;
        await BLOG.findByIdAndDelete(id);      
        
        res.status(200).json({sucess: true , message : " blog deleted"});
    } catch (error) {
        return res.status(500).json({ sucess:false, message: "Server Error" });
    }
}

//like blog
exports.likeBlog = async (req, res) => {
    try {
        const { user } = req;
        const { id } = req.params;
        const blog = await BLOG.findById(id);
        if (!blog) {
            return res.status(400).json({ error: "Blog not found" });
        }
        const userLikeIndex = blog.likedBlogsByUsers.indexof(user._id);
        if (userLikeIndex === -1){
            blog.likedBlogsByUsers.push(user._id);
            blog.likes += 1;
        } else {
            return res.status(400).json({error: "blog is already liked"})
        }
        await blog.save();
        res.status(200).json({sucess: true , message : " blog liked"});
    } catch (error) {
        return res.status(500).json({ sucess:false, message: "Server Error" });
    }
}

//dislike blog
exports.dislikeBlog = async (req, res) => {
    try {
        const { user } = req;
        const { id } = req.params;
        const blog = await BLOG.findById(id);
        if (!blog) {
            return res.status(400).json({ error: "Blog not found" });
        }
        const userDislikeIndex = blog.likedBlogsByUsers.indexof(user._id);
        if (userDislikeIndex === -1){
            blog.likedBlogsByUsers.push(user._id);
            blog.dislikes += 1;
        } else {
            returnres.status(400).json({errpr: "blog is already disliked"})
        }
        await blog.save();
        res.status(200).json({sucess: true , message : " blog disliked"});
    } catch (error) {
        return res.status(500).json({ sucess:false, message: "Server Error" });
    }
}