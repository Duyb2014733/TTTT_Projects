const Ride = require("../models/Ride.model");

class RideService {
  // Tạo một chuyến xe mới
  async createRide(rideData) {
    try {
      const ride = new Ride(rideData);
      return await ride.save();
    } catch (error) {
      throw error;
    }
  }

  // Lấy thông tin của một chuyến xe dựa trên ID
  async getRideById(rideId) {
    try {
      return await Ride.findById(rideId)
        .populate("vehicle_id")
        .populate("route_id")
        .populate("bookings")
        .populate("bus_stations");
    } catch (error) {
      throw error;
    }
  }

  // Lấy danh sách tất cả các chuyến xe
  async getAllRides() {
    try {
      return await Ride.find()
        .populate("vehicle_id")
        .populate("route_id")
        .populate("bookings")
        .populate("bus_stations");
    } catch (error) {
      throw error;
    }
  }

  // Cập nhật thông tin của một chuyến xe
  async updateRide(rideId, rideData) {
    try {
      return await Ride.findByIdAndUpdate(rideId, rideData, { new: true })
        .populate("vehicle_id")
        .populate("route_id")
        .populate("bookings")
        .populate("bus_stations");
    } catch (error) {
      throw error;
    }
  }

  // Xóa một chuyến xe dựa trên ID
  async deleteRide(rideId) {
    try {
      return await Ride.findByIdAndDelete(rideId);
    } catch (error) {
      throw error;
    }
  }

  // Xóa tất cả các chuyến xe
  async deleteAllRides() {
    try {
      return await Ride.deleteMany({});
    } catch (error) {
      throw error;
    }
  }
}

module.exports = RideService;
