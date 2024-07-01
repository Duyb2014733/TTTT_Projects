const mongoose = require("mongoose");

const VeSchema = new mongoose.Schema({
  trip_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ChuyenXe",
    required: true,
  },
  seat_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ViTriGhe",
    required: true,
  },
  ve_name: {
    type: String,
    required: true,
  },
});

const Ve = mongoose.model("Ve", VeSchema);

module.exports = Ve;
