const Xe = require("../models/Xe.model");
const ViTriGhe = require("../models/ViTriGhe.model");

class XeService {
  async getAllXe() {
    return await Xe.find().populate("nha_xe");
  }

  async getXeById(id) {
    return await Xe.findById(id).populate("nha_xe");
  }

  async createXe(xeData) {
    return await Xe.create(xeData);
  }

  async updateXe(id, xeData) {
    return await Xe.findByIdAndUpdate(id, xeData, { new: true });
  }

  async deleteXe(id) {
    return await Xe.findByIdAndDelete(id);
  }

  async updateViTriGheCount(xeId) {
    const count = await ViTriGhe.countDocuments({ vitrighe_vehicle: xeId });
    const xe = await Xe.findByIdAndUpdate(
      xeId,
      { bus_seats: count },
      { new: true }
    );
    return xe;
  }
}

module.exports = XeService;
