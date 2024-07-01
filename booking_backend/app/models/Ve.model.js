const mongoose = require("mongoose");

const VeSchema = new mongoose.Schema({
  trip_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ChuyenXe",
    required: true,
  },
  seat_number: { type: String, required: true },
  price: { type: Number, required: true },
});

const Ve = mongoose.model("Ve", VeSchema);

module.exports = Ve;
