const TuyenDuongService = require("../services/TuyenDuong.service");
const ApiError = require("../api-error");

const TuyenDuongService = new TuyenDuongService();

// Tạo một tuyến đường mới
exports.createTuyenDuong = async (req, res, next) => {
  try {
    const tuyenDuongData = req.body;
    const newTuyenDuong =
      await TuyenDuongService.createTuyenDuong(tuyenDuongData);
    res.status(201).json(newTuyenDuong);
  } catch (error) {
    next(error);
  }
};

// Lấy thông tin của một tuyến đường dựa trên ID
exports.getTuyenDuongById = async (req, res, next) => {
  try {
    const tuyenDuongId = req.params.id;
    const TuyenDuong = await TuyenDuongService.getTuyenDuongById(tuyenDuongId);
    if (!TuyenDuong) {
      throw new ApiError(404, "TuyenDuong not found");
    }
    res.status(200).json(TuyenDuong);
  } catch (error) {
    next(error);
  }
};

// Lấy danh sách tất cả các tuyến đường
exports.getAllTuyenDuongs = async (req, res, next) => {
  try {
    const TuyenDuongs = await TuyenDuongService.getAllTuyenDuongs();
    res.status(200).json(TuyenDuongs);
  } catch (error) {
    next(error);
  }
};

// Cập nhật thông tin của một tuyến đường
exports.updateTuyenDuong = async (req, res, next) => {
  try {
    const tuyenDuongId = req.params.id;
    const tuyenDuongData = req.body;
    const updatedTuyenDuong = await TuyenDuongService.updateTuyenDuong(
      tuyenDuongId,
      tuyenDuongData
    );
    if (!updatedTuyenDuong) {
      throw new ApiError(404, "TuyenDuong not found");
    }
    res.status(200).json(updatedTuyenDuong);
  } catch (error) {
    next(error);
  }
};

// Xóa một tuyến đường dựa trên ID
exports.deleteTuyenDuong = async (req, res, next) => {
  try {
    const tuyenDuongId = req.params.id;
    const deletedTuyenDuong =
      await TuyenDuongService.deleteTuyenDuong(tuyenDuongId);
    if (!deletedTuyenDuong) {
      throw new ApiError(404, "TuyenDuong not found");
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

// Xóa tất cả các tuyến đường
exports.deleteAllTuyenDuongs = async (req, res, next) => {
  try {
    await TuyenDuongService.deleteAllTuyenDuongs();
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
