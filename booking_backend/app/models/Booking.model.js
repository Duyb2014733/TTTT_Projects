const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  ride_id: { type: mongoose.Schema.Types.ObjectId, ref: "Ride" },
  num_tickets: Number,
  total_price: Number,
  booking_time: Date,
  payment_id: { type: mongoose.Schema.Types.ObjectId, ref: "Payment" },
  review_id: { type: mongoose.Schema.Types.ObjectId, ref: "Review" },
  ticket_id: { type: mongoose.Schema.Types.ObjectId, ref: "Ticket" },
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
