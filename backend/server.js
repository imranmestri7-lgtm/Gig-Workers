const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const deliveryRoutes = require("./routes/delivery");


const app = express();


// =====================================
// MIDDLEWARE
// =====================================

app.use(cors());
app.use(express.json());


// =====================================
// ROUTES
// =====================================

app.use("/api", authRoutes);
app.use("/api", deliveryRoutes);


// =====================================
// HOME
// =====================================

app.get("/", (req, res) => {
    res.send("GigWorker Backend Running");
});


// =====================================
// MONGODB
// =====================================

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB Connected");
    })
    .catch((error) => {
        console.log("MongoDB Connection Error:", error);
    });


// =====================================
// SERVER
// =====================================

app.listen(5000, () => {
    console.log("Server started on port 5000");
});