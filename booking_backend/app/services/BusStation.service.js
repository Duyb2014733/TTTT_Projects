const BusStation = require("../models/BusStation.model");

class BusStationService {
  // Tạo một bến xe mới
  async createBusStation(busStationData) {
    try {
      const busStation = new BusStation(busStationData);
      return await busStation.save();
    } catch (error) {
      throw error;
    }
  }

  // Lấy thông tin của một bến xe dựa trên ID
  async getBusStationById(busStationId) {
    try {
      return await BusStation.findById(busStationId)
        .populate("rides_departure")
        .populate("rides_arrival");
    } catch (error) {
      throw error;
    }
  }

  // Lấy danh sách tất cả các bến xe
  async getAllBusStations() {
    try {
      return await BusStation.find()
        .populate("rides_departure")
        .populate("rides_arrival");
    } catch (error) {
      throw error;
    }
  }

  // Cập nhật thông tin của một bến xe
  async updateBusStation(busStationId, busStationData) {
    try {
      return await BusStation.findByIdAndUpdate(busStationId, busStationData, {
        new: true,
      })
        .populate("rides_departure")
        .populate("rides_arrival");
    } catch (error) {
      throw error;
    }
  }

  // Xóa một bến xe dựa trên ID
  async deleteBusStation(busStationId) {
    try {
      return await BusStation.findByIdAndDelete(busStationId);
    } catch (error) {
      throw error;
    }
  }

  // Xóa tất cả các bến xe
  async deleteAllBusStations() {
    try {
      return await BusStation.deleteMany({});
    } catch (error) {
      throw error;
    }
  }
}

module.exports = BusStationService;
