const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        default: "user",
        enum: ["user", "admin"],
    },
    avatar: {
        type: String,
    },
    favouriteBlogs: [{ type: Schema.Types.ObjectId, ref:  "blog"}],
    likedBlogs:[{ type: Schema.Types.ObjectId, ref:  "blog"}],
},{timestamps: true});

module.exports = mongoose.model("user", userSchema);
