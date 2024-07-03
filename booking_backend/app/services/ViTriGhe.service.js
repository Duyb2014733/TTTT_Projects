const ViTriGhe = require("../models/ViTriGhe.model");

class ViTriGheService {
  async getAllViTriGhe() {
    return await ViTriGhe.find().populate("vitrighe_vehicle");
  }

  async getViTriGheById(id) {
    return await ViTriGhe.findById(id).populate("vitrighe_vehicle");
  }

  async createViTriGhe(ViTriGheData) {
    return await ViTriGhe.create(ViTriGheData);
  }

  async updateViTriGhe(id, ViTriGheData) {
    return await ViTriGhe.findByIdAndUpdate(id, ViTriGheData, { new: true });
  }

  async deleteViTriGhe(id) {
    return await ViTriGhe.findByIdAndDelete(id);
  }

  async getViTriGheByXeId(xeId) {
    try {
      const vitrigheList = await ViTriGhe.find({
        vitrighe_vehicle: xeId,
      }).populate("vitrighe_vehicle");
      return vitrigheList;
    } catch (error) {
      throw new Error("Error fetching seat information: " + error.message);
    }
  }

  async updateSeatsStatus(seatIds, newStatus) {
    try {
      const updatedSeats = await ViTriGhe.updateMany(
        { _id: { $in: seatIds } },
        { vitrighe_status: newStatus },
        { new: true }
      );
      return updatedSeats;
    } catch (error) {
      throw new Error("Error updating seat status: " + error.message);
    }
  }
}

module.exports = ViTriGheService;
