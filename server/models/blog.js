const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const blogSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        unique: true,
    },
    image: {
        type: String,
        required: true,
    },
    likes: {
        type: Number,
        default: 0,
    },
    dislikes: {
        type: Number,
        default: 0,
    },
    category: {},
    favouriteBlogsByUsers: [{ type: Schema.Types.ObjectId, ref:  "user"}],
    likedBlogsByUsers: [{ type: Schema.Types.ObjectId, ref:  "user"}],

},{timestamps: true});

module.exports = mongoose.model("blog", blogSchema);
