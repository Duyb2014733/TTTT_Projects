const User = require("../models/User.model");

class UserService {
  // Tạo mới một người dùng
  async createUser(userData) {
    try {
      return await User.create(userData);
    } catch (error) {
      throw error;
    }
  }

  // Lấy thông tin của một người dùng dựa trên ID
  async getUserById(userId) {
    try {
      return await User.findById(userId).populate("bookings");
    } catch (error) {
      throw error;
    }
  }

  // Lấy danh sách tất cả người dùng
  async getAllUsers() {
    try {
      return await User.find().populate("bookings");
    } catch (error) {
      throw error;
    }
  }

  // Cập nhật thông tin của một người dùng
  async updateUser(userId, userData) {
    try {
      return await User.findByIdAndUpdate(userId, userData, {
        new: true,
      }).populate("bookings");
    } catch (error) {
      throw error;
    }
  }

  // Xóa một người dùng dựa trên ID
  async deleteUser(userId) {
    try {
      return await User.findByIdAndDelete(userId);
    } catch (error) {
      throw error;
    }
  }

  // Xóa tất cả người dùng
  async deleteAllUsers() {
    try {
      return await User.deleteMany({});
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserService;
