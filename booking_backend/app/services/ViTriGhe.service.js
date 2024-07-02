const ViTriGhe = require("../models/ViTriGhe.model");

class ViTriGheService {
  async getAllViTriGhe() {
    return await ViTriGhe.find().populate("xe");
  }

  async getViTriGheById(id) {
    return await ViTriGhe.findById(id).populate("xe");
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
}

module.exports = ViTriGheService;
