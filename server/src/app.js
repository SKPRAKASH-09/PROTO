const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
require("./conn/conn");

const userApi = require("./routes/user");
const adminApi = require("./routes/admin");
const catApi = require("./routes/category");
const blogsApi = require("./routes/blogs");

const app = express();

// Middleware
app.use(cors({
    origin: ["http://localhost:5173"], // Replace with your frontend URL
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/v1", userApi);
app.use("/api/v1", adminApi);
app.use("/api/v1", catApi);
app.use("/api/v1", blogsApi);

// Default route for undefined endpoints
app.use((req, res, next) => {
    res.status(404).json({ message: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error("Error:", err.message);
    res.status(500).json({ message: "Internal Server Error" });
});

module.exports = app;