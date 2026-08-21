const express = require("express");
const Delivery = require("../models/Delivery");
const User = require("../models/User");

const router = express.Router();


// =====================================
// CREATE DELIVERY
// =====================================

router.post("/deliveries", async (req, res) => {
    try {

        const {
            restaurantId,
            pickupLocation,
            dropLocation,
            packageDetails,
            payment
        } = req.body;


        // Check required fields
        if (
            !restaurantId ||
            !pickupLocation ||
            !dropLocation ||
            !packageDetails ||
            payment === undefined
        ) {
            return res.status(400).json({
                message: "Please fill all fields"
            });
        }


        // Check restaurant
        const restaurant = await User.findById(restaurantId);

        if (!restaurant) {
            return res.status(404).json({
                message: "Restaurant not found"
            });
        }


        // Make sure account is restaurant
        if (restaurant.accountType !== "restaurant") {
            return res.status(403).json({
                message: "Only restaurants can create deliveries"
            });
        }


        // Create delivery
        const delivery = new Delivery({
            restaurant: restaurantId,
            pickupLocation,
            dropLocation,
            packageDetails,
            payment,
            status: "available"
        });


        await delivery.save();


        res.status(201).json({
            message: "Delivery created successfully",
            delivery
        });

    } catch (error) {

        console.log("Create Delivery Error:", error);

        res.status(500).json({
            message: "Server error"
        });
    }
});


// =====================================
// GET AVAILABLE DELIVERIES
// =====================================

router.get("/deliveries", async (req, res) => {
    try {

        const deliveries = await Delivery.find({
            status: "available"
        })
        .populate("restaurant", "name email")
        .sort({ createdAt: -1 });


        res.status(200).json({
            deliveries
        });

    } catch (error) {

        console.log("Get Deliveries Error:", error);

        res.status(500).json({
            message: "Server error"
        });
    }
});


// =====================================
// GET RESTAURANT DELIVERIES
// =====================================

router.get("/deliveries/restaurant/:restaurantId", async (req, res) => {
    try {

        const { restaurantId } = req.params;


        const deliveries = await Delivery.find({
            restaurant: restaurantId
        })
        .populate("rider", "name email")
        .sort({ createdAt: -1 });


        res.status(200).json({
            deliveries
        });

    } catch (error) {

        console.log("Restaurant Deliveries Error:", error);

        res.status(500).json({
            message: "Server error"
        });
    }
});


// =====================================
// ACCEPT DELIVERY
// =====================================

router.put("/deliveries/:deliveryId/accept", async (req, res) => {
    try {

        const {
            riderId
        } = req.body;

        const {
            deliveryId
        } = req.params;


        if (!riderId) {
            return res.status(400).json({
                message: "Rider ID is required"
            });
        }


        // Check rider
        const rider = await User.findById(riderId);

        if (!rider) {
            return res.status(404).json({
                message: "Rider not found"
            });
        }


        if (rider.accountType !== "rider") {
            return res.status(403).json({
                message: "Only riders can accept deliveries"
            });
        }


        // Find delivery
        const delivery = await Delivery.findById(deliveryId);

        if (!delivery) {
            return res.status(404).json({
                message: "Delivery not found"
            });
        }


        // Check availability
        if (delivery.status !== "available") {
            return res.status(400).json({
                message: "Delivery is no longer available"
            });
        }


        // Assign rider
        delivery.rider = riderId;
        delivery.status = "accepted";


        await delivery.save();


        res.status(200).json({
            message: "Delivery accepted successfully",
            delivery
        });

    } catch (error) {

        console.log("Accept Delivery Error:", error);

        res.status(500).json({
            message: "Server error"
        });
    }
});


module.exports = router;