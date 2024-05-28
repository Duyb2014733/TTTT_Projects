const ReviewService = require("../services/Review.service");
const ApiError = require("../utils/ApiError");

const reviewService = new ReviewService();

exports.createReview = async (req, res, next) => {
  try {
    const reviewData = req.body;
    const newReview = await reviewService.createReview(reviewData);
    res.status(201).json(newReview);
  } catch (error) {
    next(new ApiError(500, error.message));
  }
};

exports.getReviewById = async (req, res, next) => {
  try {
    const reviewId = req.params.id;
    const review = await reviewService.getReviewById(reviewId);
    if (!review) {
      return next(new ApiError(404, "Review not found"));
    }
    res.status(200).json(review);
  } catch (error) {
    next(new ApiError(500, error.message));
  }
};

exports.getAllReviews = async (req, res, next) => {
  try {
    const reviews = await reviewService.getAllReviews();
    res.status(200).json(reviews);
  } catch (error) {
    next(new ApiError(500, error.message));
  }
};

exports.updateReview = async (req, res, next) => {
  try {
    const reviewId = req.params.id;
    const reviewData = req.body;
    const updatedReview = await reviewService.updateReview(
      reviewId,
      reviewData
    );
    if (!updatedReview) {
      return next(new ApiError(404, "Review not found"));
    }
    res.status(200).json(updatedReview);
  } catch (error) {
    next(new ApiError(500, error.message));
  }
};

exports.deleteReview = async (req, res, next) => {
  try {
    const reviewId = req.params.id;
    const deletedReview = await reviewService.deleteReview(reviewId);
    if (!deletedReview) {
      return next(new ApiError(404, "Review not found"));
    }
    res.status(204).send();
  } catch (error) {
    next(new ApiError(500, error.message));
  }
};

exports.deleteAllReviews = async (req, res, next) => {
  try {
    await reviewService.deleteAllReviews();
    res.status(204).send();
  } catch (error) {
    next(new ApiError(500, error.message));
  }
};
