const VehicleService = require("../services/Vehicle.service");
const ApiError = require("../api-error");

const vehicleService = new VehicleService();

exports.createVehicle = async (req, res, next) => {
  try {
    const vehicleData = req.body;
    const newVehicle = await vehicleService.createVehicle(vehicleData);
    res.status(201).json(newVehicle);
  } catch (error) {
    next(error);
  }
};

exports.getVehicleById = async (req, res, next) => {
  try {
    const vehicleId = req.params.id;
    const vehicle = await vehicleService.getVehicleById(vehicleId);
    if (!vehicle) {
      throw new ApiError(404, "Vehicle not found");
    }
    res.status(200).json(vehicle);
  } catch (error) {
    next(error);
  }
};

exports.getAllVehicles = async (req, res, next) => {
  try {
    const vehicles = await vehicleService.getAllVehicles();
    res.status(200).json(vehicles);
  } catch (error) {
    next(error);
  }
};

exports.updateVehicle = async (req, res, next) => {
  try {
    const vehicleId = req.params.id;
    const vehicleData = req.body;
    const updatedVehicle = await vehicleService.updateVehicle(
      vehicleId,
      vehicleData
    );
    if (!updatedVehicle) {
      throw new ApiError(404, "Vehicle not found");
    }
    res.status(200).json(updatedVehicle);
  } catch (error) {
    next(error);
  }
};

exports.deleteVehicle = async (req, res, next) => {
  try {
    const vehicleId = req.params.id;
    const deletedVehicle = await vehicleService.deleteVehicle(vehicleId);
    if (!deletedVehicle) {
      return next(new ApiError(404, "Vehicle not found"));
    }
    res.status(204).send({ message: "Vehicle was deleted successfully" });
  } catch (error) {
    next(error);
  }
};

exports.deleteAllVehicles = async (req, res, next) => {
  try {
    await vehicleService.deleteAllVehicles();
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
