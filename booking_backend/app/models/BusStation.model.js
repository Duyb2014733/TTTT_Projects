const mongoose = require("mongoose");

const busStationSchema = new mongoose.Schema({
  name: String,
  location: String,
  rides_departure: [{ type: mongoose.Schema.Types.ObjectId, ref: "Ride" }],
  rides_arrival: [{ type: mongoose.Schema.Types.ObjectId, ref: "Ride" }],
});

const BusStation = mongoose.model("BusStation", busStationSchema);

module.exports = BusStation;
