const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    // Delivery that this review belongs to
    deliveryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Delivery",
      required: true,
    },

    // Rider who gives the review
    riderId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    riderName: {
      type: String,
      required: true,
    },

    // Restaurant receiving the review
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    restaurantName: {
      type: String,
      required: true,
    },

    // Rating from 1 to 5
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    // Optional review message
    comment: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Review", reviewSchema);