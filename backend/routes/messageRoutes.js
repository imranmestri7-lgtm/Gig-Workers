const express = require("express");
const router = express.Router();

const Message = require("../models/Message");

// =====================================
// SEND MESSAGE
// POST /api/messages
// =====================================

router.post("/", async (req, res) => {
  try {
    const {
      deliveryId,
      senderId,
      senderName,
      senderType,
      receiverId,
      message,
    } = req.body;

    if (
      !deliveryId ||
      !senderId ||
      !senderName ||
      !senderType ||
      !receiverId ||
      !message
    ) {
      return res.status(400).json({
        message: "All message fields are required",
      });
    }

    const newMessage = new Message({
      deliveryId,
      senderId,
      senderName,
      senderType,
      receiverId,
      message,
    });

    await newMessage.save();

    res.status(201).json({
      message: "Message sent successfully",
      data: newMessage,
    });
  } catch (error) {
    console.log("SEND MESSAGE ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
});

// =====================================
// GET MESSAGES FOR DELIVERY
// GET /api/messages/:deliveryId
// =====================================

router.get("/:deliveryId", async (req, res) => {
  try {
    const messages = await Message.find({
      deliveryId: req.params.deliveryId,
    }).sort({
      createdAt: 1,
    });

    res.json(messages);
  } catch (error) {
    console.log("GET MESSAGES ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;