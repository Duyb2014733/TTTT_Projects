const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ViTriGheSchema = new Schema({
  vitrighe_name: {
    type: String,
    required: true,
  },
  vitrighe_status: {
    type: String,
    enum: ["available", "booked", "unavailable"],
    default: "available",
  },
  vitrighe_vehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Xe",
    required: true,
  },
});

const ViTriGhe = mongoose.model("ViTriGhe", ViTriGheSchema);

module.exports = ViTriGhe;
