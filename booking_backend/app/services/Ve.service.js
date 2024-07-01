const Ve = require("../models/Ve.model");
const TuyenDuong = require("../models/TuyenDuong.model");
const ChuyenXe = require("../models/ChuyenXe.model");
const mongoose = require("mongoose");

class VeService {
  // Tạo một vé xe mới
  async createVe(veData) {
    try {
      const ve = new Ve(veData);
      return await ve.save();
    } catch (error) {
      throw error;
    }
  }

  // Lấy thông tin của một vé xe dựa trên ID
  async getVeById(veId) {
    try {
      if (!mongoose.Types.ObjectId.isValid(veId)) {
        throw new Error("Invalid Ve ID");
      }
      return await Ve.findById(veId).populate("trip_id");
    } catch (error) {
      throw error;
    }
  }

  // Lấy danh sách tất cả các vé xe
  async getAllVes() {
    try {
      return await Ve.find().populate("trip_id");
    } catch (error) {
      throw error;
    }
  }

  // Cập nhật thông tin của một vé xe
  async updateVe(veId, veData) {
    try {
      if (!mongoose.Types.ObjectId.isValid(veId)) {
        throw new Error("Invalid Ve ID");
      }
      return await Ve.findByIdAndUpdate(veId, veData, {
        new: true,
      }).populate("trip_id");
    } catch (error) {
      throw error;
    }
  }

  // Xóa một vé xe dựa trên ID
  async deleteVe(veId) {
    try {
      if (!mongoose.Types.ObjectId.isValid(veId)) {
        throw new Error("Invalid Ve ID");
      }
      return await Ve.findByIdAndDelete(veId);
    } catch (error) {
      throw error;
    }
  }

  // Xóa tất cả các vé xe
  async deleteAllVes() {
    try {
      return await Ve.deleteMany({});
    } catch (error) {
      throw error;
    }
  }
  async searchTickets(departure_city, arrival_city, departure_date) {
    try {
      // Tìm tuyến đường
      const route = await TuyenDuong.findOne({
        departure_city: departure_city,
        arrival_city: arrival_city,
      });

      if (!route) {
        throw new Error("No routes found for the given cities");
      }

      // Tìm chuyến xe trên tuyến đường này cho ngày đã cho
      const startOfDay = new Date(departure_date);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(departure_date);
      endOfDay.setHours(23, 59, 59, 999);

      const trips = await ChuyenXe.find({
        route_id: route._id,
        departure_time: {
          $gte: startOfDay,
          $lte: endOfDay,
        },
      }).populate("bus_id");

      if (!trips || trips.length === 0) {
        throw new Error("No trips found for the given route and date");
      }

      // Tìm vé có sẵn cho các chuyến xe này
      const availableTickets = await Promise.all(
        trips.map(async (trip) => {
          const tickets = await Ve.find({ trip_id: trip._id });

          return {
            trip: trip,
            availableSeats: 40 - tickets.length, // Giả sử mỗi xe buýt có 40 ghế
            price: tickets.length > 0 ? tickets[0].price : 0, // Lấy giá từ vé đầu tiên hoặc đặt là 0 nếu không có vé
          };
        })
      );

      return availableTickets;
    } catch (error) {
      console.error("Error in searchTickets:", error);
      throw error;
    }
  }
}

module.exports = VeService;
