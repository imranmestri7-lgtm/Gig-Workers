const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", authRoutes);

// Test route
app.get("/", (req, res) => {
    res.send("Backend Running");
});

// MongoDB connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB Connected");
    })
    .catch((err) => {
        console.log("MongoDB Connection Error:", err);
    });

// Start server
app.listen(5000, () => {
    console.log("Server started on port 5000");
});