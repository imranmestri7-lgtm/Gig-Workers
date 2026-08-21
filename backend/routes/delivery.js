const express = require("express");
const router = express.Router();

const Delivery = require("../models/Delivery");



// ==============================
// CREATE DELIVERY RESTAURANT
// ==============================

router.post("/deliveries", async(req,res)=>{


try{


const delivery = new Delivery({

restaurantId:req.body.restaurantId,

restaurantName:req.body.restaurantName,

pickupLocation:req.body.pickupLocation,

dropLocation:req.body.dropLocation,

packageDetails:req.body.packageDetails,

payment:req.body.payment


});


await delivery.save();



res.status(201).json({

message:"Delivery Created",

delivery

});



}catch(error){

console.log(error);

res.status(500).json({
message:"Server Error"
});


}


});




// ==============================
// RESTAURANT ALL DELIVERY
// ==============================


router.get(
"/deliveries/restaurant/:id",
async(req,res)=>{


try{


const deliveries =
await Delivery.find({

restaurantId:req.params.id

});


res.json({

deliveries

});



}catch(error){

res.status(500).json({
message:"Error"
});


}



});






// ==============================
// RIDER AVAILABLE DELIVERY
// ==============================


router.get(
"/deliveries/available",
async(req,res)=>{


try{


const deliveries =
await Delivery.find({

status:"available"

});


res.json({

deliveries

});



}catch(error){


res.status(500).json({
message:"Error"
});


}


});




// ==============================
// ACCEPT DELIVERY
// ==============================


router.put(
"/deliveries/accept/:id",
async(req,res)=>{


try{


const delivery =
await Delivery.findByIdAndUpdate(

req.params.id,

{

status:"accepted",

riderId:req.body.riderId,

riderName:req.body.riderName

},

{
new:true
}

);



res.json({

message:"Accepted",

delivery

});



}catch(error){

res.status(500).json({
message:"Error"
});


}



});





// ==============================
// RIDER ACTIVE DELIVERY
// ==============================


router.get(
"/deliveries/rider/:id",
async(req,res)=>{


try{


const deliveries =
await Delivery.find({

riderId:req.params.id

});



res.json({

deliveries

});


}catch(error){

res.status(500).json({
message:"Error"
});


}



});





module.exports = router;