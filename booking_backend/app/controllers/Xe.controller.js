const XeService = require("../services/Xe.service");
const NhaXeService = require("../services/NhaXe.service");
const ApiError = require("../api-error");

const xeService = new XeService();
const nhaXeService = new NhaXeService();

exports.getAllXe = async (req, res, next) => {
  try {
    const xe = await xeService.getAllXe();
    res.json(xe);
  } catch (error) {
    next(new ApiError(500, "Lỗi khi lấy danh sách xe"));
  }
};

exports.getXeById = async (req, res, next) => {
  try {
    const xe = await xeService.getXeById(req.params.id);
    if (!xe) {
      return next(new ApiError(404, "Không tìm thấy xe"));
    }
    res.json(xe);
  } catch (error) {
    next(new ApiError(500, "Lỗi khi lấy thông tin xe"));
  }
};

exports.createXe = async (req, res, next) => {
  try {
    const xe = await xeService.createXe(req.body);
    await nhaXeService.updateXeCount(xe.nha_xe);
    res.status(201).json(xe);
  } catch (error) {
    next(new ApiError(400, "Lỗi khi tạo xe"));
  }
};

exports.deleteXe = async (req, res, next) => {
  try {
    const xe = await xeService.deleteXe(req.params.id);
    if (!xe) {
      return next(new ApiError(404, "Không tìm thấy xe"));
    }
    await nhaXeService.updateXeCount(xe.nha_xe);
    res.status(200).json({ message: "Đã xóa xe" });
  } catch (error) {
    next(new ApiError(500, "Lỗi khi xóa xe"));
  }
};

exports.updateXe = async (req, res, next) => {
  try {
    const oldXe = await xeService.getXeById(req.params.id);
    const updatedXe = await xeService.updateXe(req.params.id, req.body);
    if (!updatedXe) {
      return next(new ApiError(404, "Không tìm thấy xe"));
    }
    // Nếu nhà xe thay đổi, cập nhật số lượng xe cho cả nhà xe cũ và mới
    if (oldXe.nha_xe.toString() !== updatedXe.nha_xe.toString()) {
      await nhaXeService.updateXeCount(oldXe.nha_xe);
      await nhaXeService.updateXeCount(updatedXe.nha_xe);
    }
    res.status(200).json(updatedXe);
  } catch (error) {
    next(new ApiError(400, "Lỗi khi cập nhật xe"));
  }
};
