const mongoose = require("mongoose");

const XeSchema = new mongoose.Schema({
  bus_number: { type: String, required: true, unique: true },
  bus_type: { type: String, required: true },
  nha_xe: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "NhaXe",
    required: true,
  },
});

const Xe = mongoose.model("Xe", XeSchema);

module.exports = Xe;
