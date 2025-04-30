const jwt = require("jsonwebtoken");
const User = require("../models/user");

const authMiddleware = {
    verifyToken: async (req, res, next) => {
        const token = req.cookies.blogsapptcm;
        if (!token) {
            return res.status(401).json({ message: "Access Denied. No token provided" });
        }
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;

            const user = await User.findById(decoded.id);
            if (!user) {
                return res.status(401).json({ message: "User not found" });
            }

            req.user = user;
            next();
        } catch (error) {
            res.status(401).json({ message: "Invalid token" });
        }
    },

    authorizeRole: (role) => {
        return (req, res, next) => {
            if (req.user.role !== role) {
                return res.status(403).json({ message: "Access denied" });
            }
            next();
        };
    },
};

module.exports = authMiddleware;