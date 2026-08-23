const express = require("express");
const router = express.Router();

const Delivery = require("../models/Delivery");



// =====================================
// CREATE DELIVERY (RESTAURANT)
// POST /api/deliveries
// =====================================

router.post("/", async(req,res)=>{

    try{

        const delivery = new Delivery({

            restaurantId:req.body.restaurantId,

            restaurantName:req.body.restaurantName,

            pickupLocation:req.body.pickupLocation,

            dropLocation:req.body.dropLocation,

            packageDetails:req.body.packageDetails,

            payment:req.body.payment,

            status:"available"

        });


        await delivery.save();


        res.status(201).json({

            message:"Delivery created successfully",

            delivery

        });


    }
    catch(error){

        console.log(error);


        res.status(500).json({

            message:error.message

        });

    }

});






// =====================================
// RESTAURANT SEE OWN DELIVERIES
// GET /api/deliveries/restaurant/:id
// =====================================


router.get("/restaurant/:id",async(req,res)=>{


    try{


        const deliveries = await Delivery.find({

            restaurantId:req.params.id

        });


        res.json(deliveries);



    }
    catch(error){


        res.status(500).json({

            message:error.message

        });


    }


});








// =====================================
// RIDER SEE AVAILABLE DELIVERY
// GET /api/deliveries/available
// =====================================


router.get("/available",async(req,res)=>{


    try{


        const deliveries = await Delivery.find({

            status:"available"

        });


        res.json(deliveries);



    }
    catch(error){


        res.status(500).json({

            message:error.message

        });


    }


});








// =====================================
// RIDER ACCEPT DELIVERY
// PUT /api/deliveries/accept/:id
// =====================================


router.put("/accept/:id",async(req,res)=>{


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

            message:"Delivery accepted",

            delivery

        });



    }
    catch(error){


        res.status(500).json({

            message:error.message

        });


    }


});









// =====================================
// UPDATE DELIVERY STATUS
// PUT /api/deliveries/status/:id
// =====================================


router.put("/status/:id",async(req,res)=>{


    try{


        const {

            status

        } = req.body;



        const delivery =
        await Delivery.findByIdAndUpdate(


            req.params.id,


            {

                status:status

            },


            {

                new:true

            }


        );



        res.json({

            message:"Status updated",

            delivery

        });



    }
    catch(error){


        res.status(500).json({

            message:error.message

        });


    }


});









// =====================================
// RIDER ACTIVE DELIVERY
// GET /api/deliveries/rider/:id
// =====================================


router.get("/rider/:id",async(req,res)=>{


    try{


        const deliveries =
        await Delivery.find({

            riderId:req.params.id,


            status:{
                $in:[
                    "accepted",
                    "picked",
                    "out_for_delivery"
                ]
            }


        });



        res.json(deliveries);



    }
    catch(error){


        res.status(500).json({

            message:error.message

        });


    }


});








module.exports = router;