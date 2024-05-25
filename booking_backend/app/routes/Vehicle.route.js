const express = require("express");
const router = express.Router();
const VehicleController = require("../controllers/Vehicle.controller");

const vehicleController = new VehicleController();

router
  .route("/")
  .post(vehicleController.createVehicle.bind(vehicleController))
  .get(vehicleController.getAllVehicles.bind(vehicleController))
  .delete(vehicleController.deleteAllVehicles.bind(vehicleController));

router
  .route("/:id")
  .get(vehicleController.getVehicleById.bind(vehicleController))
  .put(vehicleController.updateVehicle.bind(vehicleController))
  .delete(vehicleController.deleteVehicle.bind(vehicleController));

module.exports = router;
