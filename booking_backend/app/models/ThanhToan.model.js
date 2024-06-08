const mongoose = require("mongoose");

const ThanhToanSchema = new Schema({
  customer_id: {
    type: Schema.Types.ObjectId,
    ref: "KhachHang",
    required: true,
  },
  amount: { type: Number, required: true },
  payment_date: { type: Date, required: true },
  payment_method: { type: String, required: true },
});

const ThanhToan = mongoose.model("ThanhToan", ThanhToanSchema);

module.exports = ThanhToan;
