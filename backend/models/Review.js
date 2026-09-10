const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    // Delivery this review belongs to
    deliveryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Delivery",
      required: true,
    },

    // Rider who gives the review
    riderId: {
      type: String,
      required: true,
    },

    riderName: {
      type: String,
      required: true,
    },

    // Restaurant receiving the review
    restaurantId: {
      type: String,
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

    // Optional comment
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
reviewSchema.index({ deliveryId: 1, riderId: 1 }, { unique: true });

module.exports = mongoose.model("Review", reviewSchema);