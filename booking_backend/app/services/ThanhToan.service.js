const ThanhToan = require("../models/ThanhToan.model");
const mongoose = require("mongoose");

class ThanhToanService {
  // Tạo một thanh toán mới
  async createThanhToan(ThanhToanData) {
    try {
      const thanhToan = new ThanhToan(ThanhToanData);
      return await thanhToan.save();
    } catch (error) {
      throw error;
    }
  }

  // Lấy thông tin của một thanh toán dựa trên ID
  async getThanhToanById(ThanhToanId) {
    try {
      if (!mongoose.Types.ObjectId.isValid(ThanhToanId)) {
        throw new Error("Invalid ThanhToan ID");
      }
      return await ThanhToan.findById(ThanhToanId).populate("customer_id");
    } catch (error) {
      throw error;
    }
  }

  // Lấy danh sách tất cả các thanh toán
  async getAllThanhToans() {
    try {
      return await ThanhToan.find().populate("customer_id");
    } catch (error) {
      throw error;
    }
  }

  // Cập nhật thông tin của một thanh toán
  async updateThanhToan(ThanhToanId, ThanhToanData) {
    try {
      if (!mongoose.Types.ObjectId.isValid(ThanhToanId)) {
        throw new Error("Invalid ThanhToan ID");
      }
      return await ThanhToan.findByIdAndUpdate(ThanhToanId, ThanhToanData, {
        new: true,
      }).populate("customer_id");
    } catch (error) {
      throw error;
    }
  }

  // Xóa một thanh toán dựa trên ID
  async deleteThanhToan(ThanhToanId) {
    try {
      if (!mongoose.Types.ObjectId.isValid(ThanhToanId)) {
        throw new Error("Invalid ThanhToan ID");
      }
      return await ThanhToan.findByIdAndDelete(ThanhToanId);
    } catch (error) {
      throw error;
    }
  }

  // Xóa tất cả các thanh toán
  async deleteAllThanhToans() {
    try {
      return await ThanhToan.deleteMany({});
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ThanhToanService;
