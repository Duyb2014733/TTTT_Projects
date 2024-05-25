const mongoose = require("mongoose");

const rideSchema = new mongoose.Schema({
  vehicle_id: { type: mongoose.Schema.Types.ObjectId, ref: "Vehicle" },
  route_id: { type: mongoose.Schema.Types.ObjectId, ref: "Route" },
  departure_time: Date,
  price: Number,
  bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Booking" }],
  bus_stations: [{ type: mongoose.Schema.Types.ObjectId, ref: "BusStation" }],
});

const Ride = mongoose.model("Ride", rideSchema);

module.exports = Ride;
