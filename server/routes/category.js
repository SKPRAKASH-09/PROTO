const router = require("express").Router();
const categoryController = require("../controller/categoryController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/addCategory" , authMiddleware.verifyToken, authMiddleware.authorizeRole("admin"), categoryController.addCategory)
router.get("/getCategory", categoryController.getCategories);    
router.get("/getCategoriesById/:id", categoryController.getCategoriesById);


module.exports = router;