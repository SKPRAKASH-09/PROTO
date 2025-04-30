const multer = require("multer");
const { storage } = require("../utils/cloudinary");
const upload = multer({ storage });

module.exports = upload;
// This middleware is used to handle image uploads using multer and cloudinary.
// It uses the cloudinary storage configuration to store images in the cloud.