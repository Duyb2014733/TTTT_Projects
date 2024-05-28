const express = require("express");
const router = express.Router();
const rideController = require("../controllers/Ride.controller");

router
  .route("/")
  .post(rideController.createRide)
  .get(rideController.getAllRides)
  .delete(rideController.deleteAllRides);

router
  .route("/:id")
  .get(rideController.getRideById)
  .put(rideController.updateRide)
  .delete(rideController.deleteRide);

module.exports = router;
