const mongoose = require("mongoose");

const NhaXeSchema = new mongoose.Schema({
  company_name: { type: String, required: true },
  dia_chi: { type: String, required: true },
  so_dien_thoai: { type: String, required: true },
  so_luong_xe: { type: Number, default: 0 },
});

const NhaXe = mongoose.model("NhaXe", NhaXeSchema);

module.exports = NhaXe;
