const ChuyenXe = require("../models/ChuyenXe.model");

class ChuyenXeService {
  // Tạo một chuyến xe mới
  async createChuyenXe(chuyenXeData, imagePath) {
    try {
      console.log("Creating ChuyenXe with data:", chuyenXeData); // Add this for debugging
      const chuyenXe = new ChuyenXe(chuyenXeData);
      return await chuyenXe.save();
    } catch (error) {
      throw error;
    }
  }

  // Lấy thông tin của một chuyến xe dựa trên ID
  async getChuyenXeById(chuyenXeId) {
    try {
      return await ChuyenXe.findById(chuyenXeId)
        .populate("bus_id")
        .populate("route_id");
    } catch (error) {
      throw error;
    }
  }

  // Lấy danh sách tất cả các chuyến xe
  async getAllChuyenXes() {
    try {
      return await ChuyenXe.find().populate("bus_id").populate("route_id");
    } catch (error) {
      throw error;
    }
  }

  // Cập nhật thông tin của một chuyến xe
  async updateChuyenXe(chuyenXeId, chuyenXeData) {
    try {
      return await ChuyenXe.findByIdAndUpdate(chuyenXeId, chuyenXeData, {
        new: true,
      })
        .populate("bus_id")
        .populate("route_id");
    } catch (error) {
      throw error;
    }
  }

  // Xóa một chuyến xe dựa trên ID
  async deleteChuyenXe(chuyenXeId) {
    try {
      return await ChuyenXe.findByIdAndDelete(chuyenXeId);
    } catch (error) {
      throw error;
    }
  }

  // Xóa tất cả các chuyến xe
  async deleteAllChuyenXe() {
    try {
      return await ChuyenXe.deleteMany({});
    } catch (error) {
      throw error;
    }
  }

  async searchTrips(searchCriteria) {
    const { departure_city, arrival_city, departure_date } = searchCriteria;

    try {
      // First, find matching TuyenDuong
      const matchingRoutes = await TuyenDuong.find({
        departure_city: departure_city,
        arrival_city: arrival_city,
      });

      if (matchingRoutes.length === 0) {
        return [];
      }

      const routeIds = matchingRoutes.map((route) => route._id);

      // Then, search for ChuyenXe with matching route_id and departure_time
      let query = {
        route_id: { $in: routeIds },
      };

      if (departure_date) {
        const startOfDay = new Date(departure_date);
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(departure_date);
        endOfDay.setHours(23, 59, 59, 999);

        query.departure_time = { $gte: startOfDay, $lte: endOfDay };
      }

      const trips = await ChuyenXe.find(query)
        .populate("bus_id", "name") // Assuming NhaXe model has a 'name' field
        .populate("route_id");

      return trips;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ChuyenXeService;
