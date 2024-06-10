const TuyenDuong = require("../models/TuyenDuong.model");
const mongoose = require("mongoose");

class TuyenDuongService {
  // Tạo một tuyến đường mới
  async createTuyenDuong(tuyenDuongData) {
    try {
      return await TuyenDuong.create(tuyenDuongData);
    } catch (error) {
      throw error;
    }
  }

  // Lấy thông tin của một tuyến đường dựa trên ID
  async getTuyenDuongById(tuyenDuongId) {
    try {
      if (!mongoose.Types.ObjectId.isValid(tuyenDuongId)) {
        throw new Error("Invalid TuyenDuong ID");
      }
      return await TuyenDuong.findById(tuyenDuongId);
    } catch (error) {
      throw error;
    }
  }

  // Lấy danh sách tất cả các tuyến đường
  async getAllTuyenDuongs() {
    try {
      return await TuyenDuong.find();
    } catch (error) {
      throw error;
    }
  }

  // Cập nhật thông tin của một tuyến đường
  async updateTuyenDuong(tuyenDuongId, tuyenDuongData) {
    try {
      if (!mongoose.Types.ObjectId.isValid(tuyenDuongId)) {
        throw new Error("Invalid TuyenDuong ID");
      }
      return await TuyenDuong.findByIdAndUpdate(tuyenDuongId, tuyenDuongData, {
        new: true,
      });
    } catch (error) {
      throw error;
    }
  }

  // Xóa một tuyến đường dựa trên ID
  async deleteTuyenDuong(tuyenDuongId) {
    try {
      if (!mongoose.Types.ObjectId.isValid(tuyenDuongId)) {
        throw new Error("Invalid TuyenDuong ID");
      }
      return await TuyenDuong.findByIdAndDelete(tuyenDuongId);
    } catch (error) {
      throw error;
    }
  }

  // Xóa tất cả các tuyến đường
  async deleteAllTuyenDuongs() {
    try {
      return await TuyenDuong.deleteMany({});
    } catch (error) {
      throw error;
    }
  }
}

module.exports = TuyenDuongService;
