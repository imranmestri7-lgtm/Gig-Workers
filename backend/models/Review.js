const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    // Delivery that this review belongs to
   deliveryId: {
  type: String,
  required: true,
},

riderId: {
  type: String,
  required: true,
},

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