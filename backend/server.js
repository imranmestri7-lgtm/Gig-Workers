const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();


const authRoutes = require("./routes/auth");
const deliveryRoutes = require("./routes/delivery");


const app = express();


// ================================
// Middleware
// ================================

app.use(
    cors({
        origin:"http://localhost:5173",
        credentials:true
    })
);


app.use(express.json());



// ================================
// Routes
// ================================

app.use("/api", authRoutes);

app.use("/api/deliveries", deliveryRoutes);



// ================================
// Home Route
// ================================

app.get("/",(req,res)=>{

    res.send("GigWorker Backend Running");

});



// ================================
// MongoDB Connection
// ================================

mongoose
.connect(process.env.MONGO_URI)
.then(()=>{

    console.log("MongoDB Connected");

})
.catch((error)=>{

    console.log(
        "MongoDB Connection Error:",
        error
    );

});



// ================================
// Server
// ================================


app.listen(5000,()=>{

    console.log(
        "Server started on port 5000"
    );

});