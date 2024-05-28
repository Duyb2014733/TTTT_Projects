const express = require("express");
const router = express.Router();
const busStationController = require("../controllers/BusStation.controller");

router
  .route("/")
  .post(busStationController.createBusStation)
  .get(busStationController.getAllBusStations)
  .delete(busStationController.deleteAllBusStations);

router
  .route("/:id")
  .get(busStationController.getBusStationById)
  .put(busStationController.updateBusStation)
  .delete(busStationController.deleteBusStation);

module.exports = router;
