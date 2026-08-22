const express = require("express");
const router = express.Router();

const Delivery = require("../models/Delivery");



// =====================================
// CREATE DELIVERY (RESTAURANT)
// POST /api/deliveries
// =====================================

router.post("/", async (req, res) => {

    try {

        const {
            restaurantId,
            restaurantName,
            pickupLocation,
            dropLocation,
            packageDetails,
            payment
        } = req.body;


        const delivery = new Delivery({

            restaurantId,

            restaurantName,

            pickupLocation,

            dropLocation,

            packageDetails,

            payment,

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


router.get("/restaurant/:id", async(req,res)=>{


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


router.get("/available", async(req,res)=>{


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


router.put("/accept/:id", async(req,res)=>{


    try{


        const delivery = await Delivery.findByIdAndUpdate(


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
// RIDER REJECT DELIVERY
// PUT /api/deliveries/reject/:id
// =====================================


router.put("/reject/:id", async(req,res)=>{


    try{


        const delivery = await Delivery.findByIdAndUpdate(


            req.params.id,


            {

                status:"rejected"


            },


            {

                new:true

            }


        );



        res.json({

            message:"Delivery rejected",

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


router.get("/rider/:id", async(req,res)=>{


    try{


        const deliveries = await Delivery.find({

            riderId:req.params.id,

            status:"accepted"

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