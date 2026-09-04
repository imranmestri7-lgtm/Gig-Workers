const express = require("express");
const router = express.Router();

const Review = require("../models/reviews");

// =====================================
// CREATE REVIEW
// POST /api/reviews
// =====================================

router.post("/", async (req, res) => {
  try {
    const {
      deliveryId,
      riderId,
      riderName,
      restaurantId,
      restaurantName,
      rating,
      comment,
    } = req.body;

    // Check required fields
    if (
      !deliveryId ||
      !riderId ||
      !riderName ||
      !restaurantId ||
      !restaurantName ||
      !rating
    ) {
      return res.status(400).json({
        message: "All required review fields are needed",
      });
    }

    // Check rating
    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        message: "Rating must be between 1 and 5",
      });
    }

    // Check if rider already reviewed this delivery
    const existingReview = await Review.findOne({
      deliveryId: deliveryId,
      riderId: riderId,
    });

    if (existingReview) {
      return res.status(400).json({
        message: "You have already reviewed this delivery",
      });
    }

    // Create review
    const review = new Review({
      deliveryId,
      riderId,
      riderName,
      restaurantId,
      restaurantName,
      rating,
      comment: comment || "",
    });

    await review.save();

    res.status(201).json({
      message: "Review submitted successfully",
      review,
    });
  } catch (error) {
    console.log("CREATE REVIEW ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
});

// =====================================
// GET RESTAURANT REVIEWS
// GET /api/reviews/restaurant/:id
// =====================================

router.get("/restaurant/:id", async (req, res) => {
  try {
    const reviews = await Review.find({
      restaurantId: req.params.id,
    }).sort({
      createdAt: -1,
    });

    res.json(reviews);
  } catch (error) {
    console.log("GET RESTAURANT REVIEWS ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
});

// =====================================
// GET RIDER REVIEWS
// GET /api/reviews/rider/:id
// =====================================

router.get("/rider/:id", async (req, res) => {
  try {
    const reviews = await Review.find({
      riderId: req.params.id,
    }).sort({
      createdAt: -1,
    });

    res.json(reviews);
  } catch (error) {
    console.log("GET RIDER REVIEWS ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;