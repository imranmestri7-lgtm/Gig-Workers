const mongoose = require("mongoose");


const deliverySchema = new mongoose.Schema({

restaurantId:{
type:String,
required:true
},


restaurantName:{
type:String,
required:true
},


pickupLocation:{
type:String,
required:true
},


dropLocation:{
type:String,
required:true
},


packageDetails:{
type:String,
required:true
},


payment:{
type:Number,
required:true
},


status:{
type:String,
default:"available"
},


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


module.exports =
mongoose.model(
"Delivery",
deliverySchema
);