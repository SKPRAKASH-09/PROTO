const User = require("../models/user");
const Category = require("../models/category")
const Blog = require("../models/blog");

exports.addCategory = async (req, res) => {
    try {
        const { title } = req.body;
        //validation
        const checkCat = await Category.findOne({ title });
        if (checkCat) {
            return res.status(400).json({ sucess:false, message: "Category already exists" });
        }
        //create new category
        const newCat = new Category({ title });
        await newCat.save();
        return res.status(200).json({ sucess:true, message: "Category Created" });
    } catch (error) {
        return res.status(400).json({ sucess:false, message: "Server Error" });
    }
};

exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        return res.status(200).json({ sucess:true, categories });
    } catch (error) {
        return res.status(400).json({ sucess:false, message: "Server Error" });
    }
}
exports.deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        //validation
        const checkCat = await Category.findById(id);
        if (!checkCat) {
            return res.status(400).json({ sucess:false, message: "Category not found" });
        }
        //delete category
        await Category.findByIdAndDelete(id);
        return res.status(200).json({ sucess:true, message: "Category Deleted" });
    } catch (error) {
        return res.status(400).json({ sucess:false, message: "Server Error" });
    }
}
//getblogsbycategory
exports.getCategoriesById = async (req, res) => {
    try {
        const { id } = req.params;
        const categories = await Category.findById(id).populate("blogs");
        return res.status(200).json({ sucess:true, blogs: categories.blogs });
    } catch (error) {
        return res.status(400).json({ sucess:false, message: "Server Error" });
    }
}