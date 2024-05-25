const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  booking_id: { type: mongoose.Schema.Types.ObjectId, ref: "Booking" },
  payment_method: String,
  amount: Number,
  status: String,
});

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
