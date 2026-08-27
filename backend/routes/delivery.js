const express = require("express");
const router = express.Router();

const Delivery = require("../models/Delivery");



// =====================================
// CREATE DELIVERY (RESTAURANT)
// POST /api/deliveries
// =====================================
router.post("/", async(req,res)=>{

   try{
        console.log("Incoming Delivery:",req.body);
      const delivery = new Delivery({

    restaurantId:req.body.restaurantId,

    restaurantName:req.body.restaurantName,

    // External Platform
    platform:req.body.platform,
    orderId:req.body.orderId,

    category:req.body.category,

    pickupLocation:req.body.pickupLocation,

    dropLocation:req.body.dropLocation,

    distance:req.body.distance,

    estimatedTime:req.body.estimatedTime,

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

console.log("CREATE DELIVERY ERROR:",error);

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
router.get("/available/:riderId",async(req,res)=>{

try{


const deliveries = await Delivery.find({

status:"available",

rejectedBy:{
    $ne:req.params.riderId
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
router.put("/reject/:id",async(req,res)=>{

try{


const delivery =
await Delivery.findById(req.params.id);



if(!delivery){

return res.status(404).json({
message:"Delivery not found"
});

}



const riderId=req.body.riderId;



if(!delivery.rejectedBy.includes(riderId)){

delivery.rejectedBy.push(riderId);

}



await delivery.save();



res.json({

message:"Delivery rejected for this rider",

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

// =====================================
// RIDER EARNINGS
// GET /api/deliveries/rider/earnings/:id
// =====================================

router.get("/rider/earnings/:id", async(req,res)=>{

try{


const riderId = req.params.id;


// Total completed deliveries

const completedDeliveries =
await Delivery.find({

riderId:riderId,

status:"delivered"

});



// Total earnings

const total =
completedDeliveries.reduce(

(sum,item)=>
sum + Number(item.payment || 0),

0

);



// Today date

const today = new Date();

today.setHours(0,0,0,0);



// Today's completed deliveries

const todayDeliveries =
await Delivery.find({

riderId:riderId,

status:"delivered",

createdAt:{
$gte:today
}

});



const todayEarning =
todayDeliveries.reduce(

(sum,item)=>
sum + Number(item.payment || 0),

0

);



// Last 7 days

const weekDate = new Date();

weekDate.setDate(
weekDate.getDate()-7
);



const weekDeliveries =
await Delivery.find({

riderId:riderId,

status:"delivered",

createdAt:{
$gte:weekDate
}

});



const weekEarning =
weekDeliveries.reduce(

(sum,item)=>
sum + Number(item.payment || 0),

0

);



res.json({

today:todayEarning,

week:weekEarning,

total:total,

completed:completedDeliveries.length

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
// RIDER PLATFORM STATISTICS
// GET /api/deliveries/rider/platform-stats/:id/:platform
// =====================================

router.get(
    "/rider/platform-stats/:id/:platform",
    async (req, res) => {

        try {

            const riderId = req.params.id;
            const platform = req.params.platform;

            // Today
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            // Last 7 days
            const weekDate = new Date();
            weekDate.setDate(
                weekDate.getDate() - 7
            );

            // All completed deliveries
            const completedDeliveries =
                await Delivery.find({
                    riderId: riderId,
                    platform: platform,
                    status: "delivered"
                });

            // Today's deliveries
            const todayDeliveries =
                await Delivery.find({
                    riderId: riderId,
                    platform: platform,
                    status: "delivered",
                    createdAt: {
                        $gte: today
                    }
                });

            // This week's deliveries
            const weekDeliveries =
                await Delivery.find({
                    riderId: riderId,
                    platform: platform,
                    status: "delivered",
                    createdAt: {
                        $gte: weekDate
                    }
                });

            // Earnings
            const totalEarnings =
                completedDeliveries.reduce(
                    (sum, item) =>
                        sum + Number(item.payment || 0),
                    0
                );

            const todayEarnings =
                todayDeliveries.reduce(
                    (sum, item) =>
                        sum + Number(item.payment || 0),
                    0
                );

            const weekEarnings =
                weekDeliveries.reduce(
                    (sum, item) =>
                        sum + Number(item.payment || 0),
                    0
                );

            res.json({

                todayDeliveries:
                    todayDeliveries.length,

                todayEarnings:
                    todayEarnings,

                weekDeliveries:
                    weekDeliveries.length,

                weekEarnings:
                    weekEarnings,

                totalDeliveries:
                    completedDeliveries.length,

                totalEarnings:
                    totalEarnings

            });

        }
        catch (error) {

            console.log(
                "PLATFORM STATS ERROR:",
                error
            );

            res.status(500).json({
                message: error.message
            });

        }

    }
);

// =====================================
// RIDER PLATFORM COMPLETED ORDERS
// GET /api/deliveries/rider/platform-orders/:id/:platform
// =====================================

router.get(
    "/rider/platform-orders/:id/:platform",
    async (req, res) => {

        try {

            const riderId = req.params.id;
            const platform = req.params.platform;

            const deliveries = await Delivery.find({
                riderId: riderId,
                platform: platform,
                status: "delivered"
            }).sort({
                createdAt: -1
            });

            res.json(deliveries);

        } catch (error) {

            console.log(
                "PLATFORM ORDERS ERROR:",
                error
            );

            res.status(500).json({
                message: error.message
            });

        }

    }
);



module.exports = router;