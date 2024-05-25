const express = require("express");
const router = express.Router();
const vehicleController = require("../controllers/Vehicle.controller");

router
  .route("/")
  .post(vehicleController.createVehicle)
  .get(vehicleController.getAllVehicles)
  .delete(vehicleController.deleteAllVehicles);

router
  .route("/:id")
  .get(vehicleController.getVehicleById)
  .put(vehicleController.updateVehicle)
  .delete(vehicleController.deleteVehicle);

module.exports = router;
