const mongoose = require("mongoose");

const ThanhToanSchema = new mongoose.Schema({
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "KhachHang",
    required: true,
  },
  ve_id: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ve",
      required: true,
    },
  ],
  amount: { type: Number, required: true },
  payment_date: { type: Date, required: true },
  payment_method: { type: String, required: true },
});

const ThanhToan = mongoose.model("ThanhToan", ThanhToanSchema);

module.exports = ThanhToan;
