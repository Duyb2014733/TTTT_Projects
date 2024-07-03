const Ve = require("../models/Ve.model");
const mongoose = require("mongoose");

class VeService {
  // Tạo một vé xe mới
  async createVe(veData) {
    try {
      return await Ve.create(veData);
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
      return await Ve.findById(veId).populate("trip_id").populate("seat_id");
    } catch (error) {
      throw error;
    }
  }

  // Lấy danh sách tất cả các vé xe
  async getAllVes() {
    try {
      return await Ve.find().populate("trip_id").populate("seat_id");
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
        .populate("trip_id")
        .populate("seat_id");
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

  async getVeIdByViTriGheId(viTriGheId) {
    try {
      const ve = await Ve.findOne({ seat_id: viTriGheId });
      if (!ve) {
        throw new Error("Vé không tồn tại cho vị trí ghế này");
      }
      return ve._id; // Trả về id của vé tương ứng với vị trí ghế
    } catch (error) {
      throw error;
    }
  }
}

module.exports = VeService;
