const mongoose = require("mongoose");


const deliverySchema = new mongoose.Schema({


    // Restaurant Information

    restaurantId:{
        type:String,
        required:true
    },


    restaurantName:{
        type:String,
        required:true
    },
// Delivery Category

category:{
    type:String,
    required:true,
    enum:[
        "restaurant",
        "grocery",
        "cafe"
    ]
},

    // Delivery Location

    pickupLocation:{
        type:String,
        required:true
    },


    dropLocation:{
        type:String,
        required:true
    },


    // Package Details

    packageDetails:{
        type:String,
        required:true
    },


    payment:{
        type:Number,
        required:true
    },
// Google Maps Data

distance:{
    type:String,
    default:null
},


estimatedTime:{
    type:String,
    default:null
},

    // Delivery Status

    status:{
        type:String,

        enum:[
            "available",
            "accepted",
            "picked",
            "out_for_delivery",
            "delivered"
        ],

        default:"available"
    },


    // Rider Information

    riderId:{
        type:String,
        default:null
    },


    riderName:{
        type:String,
        default:null
    }


},
{
    timestamps:true
});


module.exports = mongoose.model(
    "Delivery",
    deliverySchema
);