const NhaXeService = require("../services/NhaXe.service");
const ApiError = require("../api-error");

const nhaXeService = new NhaXeService();

exports.getAllNhaXe = async (req, res, next) => {
  try {
    const nhaXe = await nhaXeService.getAllNhaXe();
    res.status(200).json(nhaXe);
  } catch (error) {
    next(new ApiError(500, "Lỗi khi lấy danh sách nhà xe"));
  }
};

exports.getNhaXeById = async (req, res, next) => {
  try {
    const nhaXe = await nhaXeService.getNhaXeById(req.params.id);
    if (!nhaXe) {
      return next(new ApiError(404, "Không tìm thấy nhà xe"));
    }
    res.status(200).json(nhaXe);
  } catch (error) {
    next(new ApiError(500, "Lỗi khi lấy thông tin nhà xe"));
  }
};

exports.createNhaXe = async (req, res, next) => {
  try {
    const nhaXe = await nhaXeService.createNhaXe(req.body);
    res.status(201).json(nhaXe);
  } catch (error) {
    next(new ApiError(400, "Lỗi khi tạo nhà xe"));
  }
};

exports.updateNhaXe = async (req, res, next) => {
  try {
    const nhaXe = await nhaXeService.updateNhaXe(req.params.id, req.body);
    if (!nhaXe) {
      return next(new ApiError(404, "Không tìm thấy nhà xe"));
    }
    res.status(200).json(nhaXe);
  } catch (error) {
    next(new ApiError(400, "Lỗi khi cập nhật nhà xe"));
  }
};

exports.deleteNhaXe = async (req, res, next) => {
  try {
    const nhaXe = await nhaXeService.deleteNhaXe(req.params.id);
    if (!nhaXe) {
      return next(new ApiError(404, "Không tìm thấy nhà xe"));
    }
    res.status(204).json({ message: "Đã xóa nhà xe" });
  } catch (error) {
    next(new ApiError(500, "Lỗi khi xóa nhà xe"));
  }
};
