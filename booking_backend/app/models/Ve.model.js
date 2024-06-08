const mongoose = require("mongoose");

const VeSchema = new Schema({
  customer_id: {
    type: Schema.Types.ObjectId,
    ref: "KhachHang",
    required: true,
  },
  trip_id: { type: Schema.Types.ObjectId, ref: "ChuyenXe", required: true },
  seat_number: { type: String, required: true },
  purchase_date: { type: Date, required: true },
  price: { type: Number, required: true },
  payment_id: { type: Schema.Types.ObjectId, ref: "ThanhToan", required: true },
});

const Ve = mongoose.model("Ve", VeSchema);

module.exports = Ve;
