const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  booking_id: { type: mongoose.Schema.Types.ObjectId, ref: "Booking" },
  rating: Number,
  comment: String,
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
