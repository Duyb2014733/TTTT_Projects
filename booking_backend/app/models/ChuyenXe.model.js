const mongoose = require("mongoose");

const ChuyenXeSchema = new mongoose.Schema({
  bus_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "NhaXe",
    required: true,
  },
  route_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TuyenDuong",
    required: true,
  },
  departure_time: { type: Date, required: true },
  arrival_time: { type: Date, required: true },
  image: { type: String, required: true },
});

const ChuyenXe = mongoose.model("ChuyenXe", ChuyenXeSchema);

module.exports = ChuyenXe;
