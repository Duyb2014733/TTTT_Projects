const TuyenDuong = require("../models/TuyenDuong.model");
const mongoose = require("mongoose");

class TuyenDuongService {
  // Tạo một tuyến đường mới
  async createRoute(routeData) {
    try {
      return await TuyenDuong.create(routeData);
    } catch (error) {
      throw error;
    }
  }

  // Lấy thông tin của một tuyến đường dựa trên ID
  async getRouteById(routeId) {
    try {
      if (!mongoose.Types.ObjectId.isValid(routeId)) {
        throw new Error("Invalid Route ID");
      }
      return await TuyenDuong.findById(routeId);
    } catch (error) {
      throw error;
    }
  }

  // Lấy danh sách tất cả các tuyến đường
  async getAllRoutes() {
    try {
      return await TuyenDuong.find();
    } catch (error) {
      throw error;
    }
  }

  // Cập nhật thông tin của một tuyến đường
  async updateRoute(routeId, routeData) {
    try {
      if (!mongoose.Types.ObjectId.isValid(routeId)) {
        throw new Error("Invalid Route ID");
      }
      return await TuyenDuong.findByIdAndUpdate(routeId, routeData, {
        new: true,
      });
    } catch (error) {
      throw error;
    }
  }

  // Xóa một tuyến đường dựa trên ID
  async deleteRoute(routeId) {
    try {
      if (!mongoose.Types.ObjectId.isValid(routeId)) {
        throw new Error("Invalid Route ID");
      }
      return await TuyenDuong.findByIdAndDelete(routeId);
    } catch (error) {
      throw error;
    }
  }

  // Xóa tất cả các tuyến đường
  async deleteAllRoutes() {
    try {
      return await TuyenDuong.deleteMany({});
    } catch (error) {
      throw error;
    }
  }
}

module.exports = TuyenDuongService;
