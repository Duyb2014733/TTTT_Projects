const mongoose = require("mongoose");

const routeSchema = new mongoose.Schema({
  stops: [{ location: String, arrival_time: Date }],
});

const Route = mongoose.model("Route", routeSchema);

module.exports = Route;
