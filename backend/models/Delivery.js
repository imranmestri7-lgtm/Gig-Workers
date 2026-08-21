const mongoose = require("mongoose");

const deliverySchema = new mongoose.Schema(
    {
        restaurant: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        rider: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null
        },

        pickupLocation: {
            type: String,
            required: true,
            trim: true
        },

        dropLocation: {
            type: String,
            required: true,
            trim: true
        },

        packageDetails: {
            type: String,
            required: true,
            trim: true
        },

        payment: {
            type: Number,
            required: true
        },

        status: {
            type: String,
            enum: [
                "available",
                "accepted",
                "picked_up",
                "out_for_delivery",
                "completed"
            ],
            default: "available"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Delivery", deliverySchema);