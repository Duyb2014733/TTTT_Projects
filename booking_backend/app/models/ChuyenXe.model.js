const mongoose = require("mongoose");

const ChuyenXeSchema = new mongoose.Schema({
  xe_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Xe",
    required: true,
  },
  chuyenXe_name: {
    type: String,
    required: true,
  },
  tuyenduong_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TuyenDuong",
    required: true,
  },
  departure_time: { type: Date, required: true },
  arrival_time: { type: Date, required: true },
  image: { type: String, required: true },
  price: { type: String, required: true },
});

const ChuyenXe = mongoose.model("ChuyenXe", ChuyenXeSchema);

module.exports = ChuyenXe;
