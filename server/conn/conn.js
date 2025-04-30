const mongoose = require("mongoose");

const conn = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true, // Use the new URL parser
            useUnifiedTopology: true, // Use the new Server Discover and Monitoring engine
        });
        console.log("Database connected successfully");
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
        process.exit(1); // Exit the process with failure
    }
};

module.exports = conn;