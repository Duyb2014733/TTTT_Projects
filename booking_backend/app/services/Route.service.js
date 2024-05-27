const Route = require("../models/Route.model");

class RouteService {
  // Tạo một tuyến đường mới
  async createRoute(routeData) {
    try {
      return await Route.create(routeData);
    } catch (error) {
      throw error;
    }
  }

  // Lấy thông tin của một tuyến đường dựa trên ID
  async getRouteById(routeId) {
    try {
      return await Route.findById(routeId);
    } catch (error) {
      throw error;
    }
  }

  // Lấy danh sách tất cả các tuyến đường
  async getAllRoutes() {
    try {
      return await Route.find();
    } catch (error) {
      throw error;
    }
  }

  // Cập nhật thông tin của một tuyến đường
  async updateRoute(routeId, routeData) {
    try {
      return await Route.findByIdAndUpdate(routeId, routeData, {
        new: true,
      });
    } catch (error) {
      throw error;
    }
  }

  // Xóa một tuyến đường dựa trên ID
  async deleteRoute(routeId) {
    try {
      return await Route.findByIdAndDelete(routeId);
    } catch (error) {
      throw error;
    }
  }

  // Xóa tất cả các tuyến đường
  async deleteAllRoutes() {
    try {
      return await Route.deleteMany({});
    } catch (error) {
      throw error;
    }
  }
}

module.exports = RouteService;
