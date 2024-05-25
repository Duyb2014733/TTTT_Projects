const VehicleService = require("../services/Vehicle.service");

class VehicleController {
  constructor() {
    this.vehicleService = new VehicleService();
  }

  async createVehicle(req, res, next) {
    try {
      const vehicleData = req.body;
      const newVehicle = await this.vehicleService.createVehicle(vehicleData);
      res.status(201).json(newVehicle);
    } catch (error) {
      next(error);
    }
  }

  async getVehicleById(req, res, next) {
    try {
      const vehicleId = req.params.id;
      const vehicle = await this.vehicleService.getVehicleById(vehicleId);
      if (!vehicle) {
        return res.status(404).json({ message: "Vehicle not found" });
      }
      res.status(200).json(vehicle);
    } catch (error) {
      next(error);
    }
  }

  async getAllVehicles(req, res, next) {
    try {
      const vehicles = await this.vehicleService.getAllVehicles();
      res.status(200).json(vehicles);
    } catch (error) {
      next(error);
    }
  }

  async updateVehicle(req, res, next) {
    try {
      const vehicleId = req.params.id;
      const vehicleData = req.body;
      const updatedVehicle = await this.vehicleService.updateVehicle(
        vehicleId,
        vehicleData
      );
      if (!updatedVehicle) {
        return res.status(404).json({ message: "Vehicle not found" });
      }
      res.status(200).json(updatedVehicle);
    } catch (error) {
      next(error);
    }
  }

  async deleteVehicle(req, res, next) {
    try {
      const vehicleId = req.params.id;
      const deletedVehicle = await this.vehicleService.deleteVehicle(vehicleId);
      if (!deletedVehicle) {
        return res.status(404).json({ message: "Vehicle not found" });
      }
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  async deleteAllVehicles(req, res, next) {
    try {
      await this.vehicleService.deleteAllVehicles();
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = VehicleController;
