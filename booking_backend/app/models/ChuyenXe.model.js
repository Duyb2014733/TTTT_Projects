const mongoose = require("mongoose");

const ChuyenXeSchema = new Schema({
  bus_id: { type: Schema.Types.ObjectId, ref: "NhaXe", required: true },
  route_id: { type: Schema.Types.ObjectId, ref: "TuyenDuong", required: true },
  departure_time: { type: Date, required: true },
  arrival_time: { type: Date, required: true },
});

const ChuyenXe = mongoose.model("Ride", ChuyenXeSchema);

module.exports = ChuyenXe;
