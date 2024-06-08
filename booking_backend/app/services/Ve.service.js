const Ve = require("../models/Ve.model");
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
      return await Ve.findById(veId)
        .populate("customer_id")
        .populate("trip_id")
        .populate("payment_id");
    } catch (error) {
      throw error;
    }
  }

  // Lấy danh sách tất cả các vé xe
  async getAllVes() {
    try {
      return await Ve.find()
        .populate("customer_id")
        .populate("trip_id")
        .populate("payment_id");
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
      })
        .populate("customer_id")
        .populate("trip_id")
        .populate("payment_id");
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
}

module.exports = VeService;
