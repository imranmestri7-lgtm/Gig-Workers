const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const deliveryRoutes = require("./routes/delivery");


const app = express();


// ================================
// MIDDLEWARE
// ================================

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true
    })
);


app.use(express.json());




// ================================
// ROUTES
// ================================

app.use("/api", authRoutes);


// IMPORTANT
// All delivery APIs start with:
// http://localhost:5000/api/deliveries

app.use("/api/deliveries", deliveryRoutes);




// ================================
// TEST ROUTE
// ================================

app.get("/", (req,res)=>{

    res.send("GigWorker Backend Running");

});




// ================================
// DATABASE
// ================================

mongoose.connect(process.env.MONGO_URI)

.then(()=>{

    console.log("MongoDB Connected");

})

.catch((error)=>{

    console.log(
        "MongoDB Error:",
        error.message
    );

});




// ================================
// SERVER
// ================================

app.listen(5000,()=>{

    console.log(
        "Server started on port 5000"
    );

});