const router = require("express").Router();
const blogsController = require("../controller/blogsController")
const authMiddleware = require("../middlewares/authMiddleware");

//fetchallblogs
router.get("/fetchAllBlogs", blogsController)

//fetch latest news
router.get("/fetchLatestNews", blogsController.fetchLatestNews)

//get description by id
router.get("/getDescById/:id",blogsController.getDescById)

//add blogs to favourite
router.get("/addBlogsToFavourite/:id", authMiddleware.verifyToken, blogsController.addBlogsToFavourite)

//remove from blogs
router.put("/removeBlogsFromFavourite/:id", authMiddleware.verifyToken, blogsController.removeBlogsFromFavourite)

//like and dislike blogs
router.put("/likeAndDislikeBlogs/:id", authMiddleware.verifyToken, blogsController.likeAndDislikeBlogs)

//edit a blog
router.put("/editBlog/:id", authMiddleware.verifyToken,authMiddleware.authorizeRole("admin"), blogsController.editBlog)

//delete a blog 
router.put("/deleteBlog/:id", authMiddleware.verifyToken,authMiddleware.authorizeRole("admin"), blogsController.deleteBlog)

module.exports = router;