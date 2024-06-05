const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
  name_vehicle: String,
  type: String,
  seats: Number,
});

const Vehicle = mongoose.model("Vehicle", vehicleSchema);

module.exports = Vehicle;
