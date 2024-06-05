const Vehicle = require("../models/Vehicle.model");

class VehicleService {
  // Tạo một xe mới
  async createVehicle(vehicleData) {
    try {
      return await Vehicle.create(vehicleData);
    } catch (error) {
      throw error;
    }
  }

  // Lấy thông tin của một xe dựa trên ID
  async getVehicleById(vehicleId) {
    try {
      return await Vehicle.findById(vehicleId);
    } catch (error) {
      throw error;
    }
  }

  // Lấy danh sách tất cả các xe
  async getAllVehicles() {
    try {
      return await Vehicle.find();
    } catch (error) {
      throw error;
    }
  }

  // Cập nhật thông tin của một xe
  async updateVehicle(vehicleId, vehicleData) {
    try {
      return await Vehicle.findByIdAndUpdate(vehicleId, vehicleData, {
        new: true,
      });
    } catch (error) {
      throw error;
    }
  }

  // Xóa một xe dựa trên ID
  async deleteVehicle(vehicleId) {
    try {
      return await Vehicle.findByIdAndDelete(vehicleId);
    } catch (error) {
      throw error;
    }
  }

  // Xóa tất cả các xe
  async deleteAllVehicles() {
    try {
      return await Vehicle.deleteMany({});
    } catch (error) {
      throw error;
    }
  }
}

module.exports = VehicleService;
