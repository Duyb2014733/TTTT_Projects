const KhachHang = require("../models/KhachHang.model");

class KhachHangService {
  // Tạo mới một người dùng
  async createKhachHang(KhachHangData) {
    try {
      return await KhachHang.create(KhachHangData);
    } catch (error) {
      throw error;
    }
  }

  // Lấy thông tin của một người dùng dựa trên ID
  async getKhachHangById(KhachHangId) {
    try {
      return await KhachHang.findById(KhachHangId);
    } catch (error) {
      throw error;
    }
  }

  // Lấy danh sách tất cả người dùng
  async getAllKhachHangs() {
    try {
      return await KhachHang.find();
    } catch (error) {
      throw error;
    }
  }

  // Cập nhật thông tin của một người dùng
  async updateKhachHang(KhachHangId, KhachHangData) {
    try {
      return await KhachHang.findByIdAndUpdate(KhachHangId, KhachHangData, {
        new: true,
      }).populate("bookings");
    } catch (error) {
      throw error;
    }
  }

  // Xóa một người dùng dựa trên ID
  async deleteKhachHang(KhachHangId) {
    try {
      return await KhachHang.findByIdAndDelete(KhachHangId);
    } catch (error) {
      throw error;
    }
  }

  // Xóa tất cả người dùng
  async deleteAllKhachHangs() {
    try {
      return await KhachHang.deleteMany({});
    } catch (error) {
      throw error;
    }
  }
}

module.exports = KhachHangService;
