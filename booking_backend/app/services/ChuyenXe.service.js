const ChuyenXe = require("../models/ChuyenXe.model");
const TuyenDuong = require("../models/TuyenDuong.model");
const Ve = require("../models/Ve.model");

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

  async searchChuyenXe(departure_city, arrival_city, departure_date) {
    try {
      // Tìm tuyến đường
      const route = await TuyenDuong.findOne({
        departure_city: departure_city,
        arrival_city: arrival_city,
      });

      if (!route) {
        throw new Error("Không tìm thấy tuyến đường cho các thành phố đã cho");
      }

      // Tìm chuyến xe trên tuyến đường này cho ngày đã cho
      const startOfDay = new Date(departure_date);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(departure_date);
      endOfDay.setHours(23, 59, 59, 999);

      const trips = await ChuyenXe.find({
        route_id: route._id,
        departure_time: {
          $gte: startOfDay,
          $lte: endOfDay,
        },
      }).populate("bus_id");

      if (!trips || trips.length === 0) {
        throw new Error(
          "Không tìm thấy chuyến xe cho tuyến đường và ngày đã cho"
        );
      }

      // Tìm vé có sẵn cho các chuyến xe này
      const availableChuyenXe = await Promise.all(
        trips.map(async (trip) => {
          const tickets = await Ve.find({ trip_id: trip._id });

          return {
            chuyenXe: trip,
            soChoTrong: 40 - tickets.length, // Giả sử mỗi xe buýt có 40 ghế
            gia: tickets.length > 0 ? tickets[0].price : 0, // Lấy giá từ vé đầu tiên hoặc đặt là 0 nếu không có vé
          };
        })
      );

      return availableChuyenXe;
    } catch (error) {
      console.error("Lỗi trong searchChuyenXe:", error);
      throw error;
    }
  }
}

module.exports = ChuyenXeService;
