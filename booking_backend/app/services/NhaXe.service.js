const NhaXe = require("../models/NhaXe.model");
const Xe = require("../models/Xe.model");

class NhaXeService {
  async getAllNhaXe() {
    return await NhaXe.find();
  }

  async getNhaXeById(id) {
    return await NhaXe.findById(id);
  }

  async createNhaXe(nhaXeData) {
    const nhaXe = new NhaXe(nhaXeData);
    return await nhaXe.save();
  }

  async findNhaXeBySoDienThoai(soDienThoai) {
    return await NhaXe.findOne({ so_dien_thoai: soDienThoai });
  }

  async updateNhaXe(id, nhaXeData) {
    return await NhaXe.findByIdAndUpdate(id, nhaXeData, { new: true });
  }

  async deleteNhaXe(id) {
    return await NhaXe.findByIdAndDelete(id);
  }

  async updateXeCount(nhaXeId) {
    const count = await Xe.countDocuments({ nha_xe: nhaXeId });
    const nhaXe = await NhaXe.findByIdAndUpdate(
      nhaXeId,
      { so_luong_xe: count },
      { new: true }
    );
    return nhaXe;
  }
}

module.exports = NhaXeService;
