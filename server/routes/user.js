const router = require("express").Router();
const userController = require("../controller/userController");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middlewares/ImageUpload");

//sign-up api
router.post("/sign-up",usercontroller.signupUser);

//login api
router.post("/login",usercontroller.loginUser);

//check cookie
router.get("/check-cookie", usercontroller.checkCookie);

//logout
router.post("/logout", usercontroller.logout);

//getProfileData
router.get(
    "/getProfileData",
    authMiddleware.verifyToken(),
    authMiddleware.authorizeRole("user"), 
    usercontroller.getProfileData
);

//change user password
router.put(
    "/changeUserPassword",
    authMiddleware.verifyToken(),
    authMiddleware.authorizeRole("user"), 
    userController.changeUserPassword
);

//Change Avatar
router.put(
    "/changeAvatar",
    authMiddleware.verifyToken,
    authMiddleware.authorizeRole("user"), 
    upload.single("image"),
    userController.changeUserPassword
);

router.get("getLikedBlogsOfAUser/:id",
    authMiddleware.verifyToken,
    authMiddleware.authorizeRole("user"), 
    userController.getLikedBlogsOfAUser
);
module.exports = router;