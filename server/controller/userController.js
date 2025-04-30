const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Sign-up controller
exports.signupUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ success: false, message: "Please fill all the fields" });
        }
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        return res.status(201).json({ success: true, message: "Account created successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

// Login controller
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Please fill all the fields" });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }
        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "30d" });
        res.cookie("blogsapptcm", token, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
        });
        return res.status(200).json({ success: true, message: "Login successful" });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error" });
    }
};