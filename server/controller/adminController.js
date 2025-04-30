const User = require("../models/user");
const Blog = require("../models/blog");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Cat = require("../models/category");
exports.adminLogin = async(req, res) => {
    try {
            const { email, password } = req.body;
            //validation
            if (!email || !password) {
                return res.status(400).json({ sucess:false, message: "Please fill all the fields" });
            }
            //check if user already exists
            const userExists = await User.findOne({ email });
            if (!userExists) {
                return res.status(400).json({ sucess:false, message: "invalid credentials" });
            }
            const checkPassword = await bcrypt.compare(password, userExists.password);
            if (!checkPassword) {
                return res.status(400).json({ sucess:false, message: "invalid credentials" });
            }
            const token = jwt.sign({ id: userExists._id, email: userExists.email }, process.env.JWT_SECRET, { expiresIn: "30d" });
            //store token in cookie
            res.cookie("token", token, {
                httpOnly: true,
                secure: true,
                sameSite:"None" ,
            });
            return res.status(200).json({ sucess:true, message: "Login Successfully" });
        
        } catch (error) {
            return res.status(400).json({ sucess:false, message: "Server Error" });
        }
}

//add blog controller
exports.addBlog = async (req, res) => {
    try {
        const { title, description, category } = req.body;
        const image = req.file.filename;
        //validation
        if (!title || !description || !image || !category) {
            return res.status(400).json({ sucess:false, message: "Please fill all the fields" });
        }
        //check if blog already exists
        const blogExists = await Blog.findOne({ title });
        if (blogExists) {
            return res.status(400).json({ sucess:false, message: "Blog already exists" });
        }
        const existingCat = await Cat.findOne({ title: category });
        if (!existingCat) {
            return res.status(400).json({ sucess:false, message: "Category not found" });
        }
        //create new blog
        const newBlog = new Blog({ title, description, image });
        await newBlog.save();
        existingCat.blogs.push(newBlog._id);
        await existingCat.save();

        return res.status(200).json({ sucess:true, message: "Blog Created" });
    } catch (error) {
        return res.status(400).json({ sucess:false, message: "Server Error" });
    }
}