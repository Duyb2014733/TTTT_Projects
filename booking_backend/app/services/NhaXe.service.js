const NhaXe = require("../models/NhaXe.model");

class NhaXeService {
  // Tạo một nhà xe mới
  async createNhaXe(nhaXeData) {
    try {
      const nhaXe = new NhaXe(nhaXeData);
      return await nhaXe.save();
    } catch (error) {
      throw error;
    }
  }

  // Lấy thông tin của một nhà xe dựa trên ID
  async getNhaXeById(nhaXeId) {
    try {
      return await NhaXe.findById(nhaXeId);
    } catch (error) {
      throw error;
    }
  }

  // Lấy danh sách tất cả các nhà xe
  async getAllNhaXe() {
    try {
      return await NhaXe.find();
    } catch (error) {
      throw error;
    }
  }

  // Cập nhật thông tin của một nhà xe
  async updateNhaXe(nhaXeId, nhaXeData) {
    try {
      return await NhaXe.findByIdAndUpdate(nhaXeId, nhaXeData, {
        new: true,
      });
    } catch (error) {
      throw error;
    }
  }

  // Xóa một nhà xe dựa trên ID
  async deleteNhaXe(nhaXeId) {
    try {
      return await NhaXe.findByIdAndDelete(nhaXeId);
    } catch (error) {
      throw error;
    }
  }

  // Xóa tất cả các nhà xe
  async deleteAllNhaXe() {
    try {
      return await NhaXe.deleteMany({});
    } catch (error) {
      throw error;
    }
  }
}

module.exports = NhaXeService;
