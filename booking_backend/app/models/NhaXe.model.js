const mongoose = require("mongoose");

const NhaXeSchema = new Schema({
  company_name: { type: String, required: true },
  bus_number: { type: String, required: true, unique: true },
  bus_type: { type: String, required: true },
});

const NhaXe = mongoose.model("NhaXe", NhaXeSchema);

module.exports = NhaXe;
