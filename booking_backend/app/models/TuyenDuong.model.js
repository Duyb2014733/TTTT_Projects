const mongoose = require("mongoose");

const TuyenDuongSchema = new Schema({
  departure_city: { type: String, required: true },
  arrival_city: { type: String, required: true },
  distance: { type: Number, required: true },
  duration: { type: String, required: true },
});

const TuyenDuong = mongoose.model("TuyenDuong", TuyenDuongSchema);

module.exports = TuyenDuong;
