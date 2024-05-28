const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/Review.controller");

router
  .route("/")
  .post(reviewController.createReview)
  .get(reviewController.getAllReviews)
  .delete(reviewController.deleteAllReviews);

router
  .route("/:id")
  .get(reviewController.getReviewById)
  .put(reviewController.updateReview)
  .delete(reviewController.deleteReview);

module.exports = router;
