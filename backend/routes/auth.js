const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const router = express.Router();


// =========================
// SIGN UP
// =========================

router.post("/signup", async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            accountType
        } = req.body;

        // Check required fields
        if (!name || !email || !password || !accountType) {
            return res.status(400).json({
                message: "Please fill all fields"
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({
            email: email.toLowerCase()
        });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = new User({
            name,
            email: email.toLowerCase(),
            password: hashedPassword,
            accountType
        });

        // Save user to MongoDB
        await user.save();

        res.status(201).json({
            message: "Account created successfully"
        });

    } catch (error) {
        console.log("Signup Error:", error);

        res.status(500).json({
            message: "Server error"
        });
    }
});


// =========================
// LOGIN
// =========================

router.post("/login", async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body;

        // Check required fields
        if (!email || !password) {
            return res.status(400).json({
                message: "Please enter email and password"
            });
        }

        // Find user
        const user = await User.findOne({
            email: email.toLowerCase()
        });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // Check password
        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordMatch) {
            return res.status(401).json({
                message: "Incorrect password"
            });
        }

        // Login successful
        res.status(200).json({
            message: "Login successful",

            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                accountType: user.accountType
            }
        });

    } catch (error) {
        console.log("Login Error:", error);

        res.status(500).json({
            message: "Server error"
        });
    }
});


module.exports = router;