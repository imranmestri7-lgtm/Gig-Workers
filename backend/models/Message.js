const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    deliveryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Delivery",
      required: true,
    },

    senderId: {
      type: String,
      required: true,
    },

    senderName: {
      type: String,
      required: true,
    },

    senderType: {
      type: String,
      enum: ["rider", "restaurant"],
      required: true,
    },

    receiverId: {
      type: String,
      required: true,
    },

    receiverType: {
      type: String,
      enum: ["rider", "restaurant"],
      required: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Message", messageSchema);