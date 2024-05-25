const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  address: String,
  bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Booking" }],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
