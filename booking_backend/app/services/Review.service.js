const Review = require("../models/Review.model");

class ReviewService {
  // Tạo một đánh giá mới
  async createReview(reviewData) {
    try {
      const review = new Review(reviewData);
      return await review.save();
    } catch (error) {
      throw error;
    }
  }

  // Lấy thông tin của một đánh giá dựa trên ID
  async getReviewById(reviewId) {
    try {
      return await Review.findById(reviewId).populate("booking_id");
    } catch (error) {
      throw error;
    }
  }

  // Lấy danh sách tất cả các đánh giá
  async getAllReviews() {
    try {
      return await Review.find().populate("booking_id");
    } catch (error) {
      throw error;
    }
  }

  // Cập nhật thông tin của một đánh giá
  async updateReview(reviewId, reviewData) {
    try {
      return await Review.findByIdAndUpdate(reviewId, reviewData, {
        new: true,
      }).populate("booking_id");
    } catch (error) {
      throw error;
    }
  }

  // Xóa một đánh giá dựa trên ID
  async deleteReview(reviewId) {
    try {
      return await Review.findByIdAndDelete(reviewId);
    } catch (error) {
      throw error;
    }
  }

  // Xóa tất cả các đánh giá
  async deleteAllReviews() {
    try {
      return await Review.deleteMany({});
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ReviewService;
