const ChuyenXeService = require("../services/ChuyenXe.service");
const upload = require("../middlewares/upload");
const ApiError = require("../api-error");

const chuyenXeService = new ChuyenXeService();

exports.createChuyenXe = async (req, res, next) => {
  upload(req, res, async (err) => {
    if (err) {
      return next(new ApiError(400, err.message));
    }

    try {
      const imagePath = req.file
        ? `/api/chuyenxe/uploads/${req.file.filename}`
        : null;
      const chuyenXeData = { ...req.body, image: imagePath };
      const newChuyenXe = await chuyenXeService.createChuyenXe(chuyenXeData);
      res.status(201).json(newChuyenXe);
    } catch (error) {
      next(new ApiError(500, `Error creating ChuyenXe: ${error.message}`));
    }
  });
};

exports.getChuyenXeById = async (req, res, next) => {
  try {
    const chuyenXe = await chuyenXeService.getChuyenXeById(req.params.id);
    if (!chuyenXe) {
      return next(new ApiError(404, "ChuyenXe not found"));
    }
    res.json(chuyenXe);
  } catch (error) {
    next(new ApiError(500, `Error retrieving ChuyenXe: ${error.message}`));
  }
};

exports.getAllChuyenXes = async (req, res, next) => {
  try {
    const chuyenXes = await chuyenXeService.getAllChuyenXes();
    res.json(chuyenXes);
  } catch (error) {
    next(new ApiError(500, `Error retrieving ChuyenXes: ${error.message}`));
  }
};

exports.updateChuyenXe = async (req, res, next) => {
  try {
    const updatedChuyenXe = await chuyenXeService.updateChuyenXe(
      req.params.id,
      req.body
    );
    if (!updatedChuyenXe) {
      return next(new ApiError(404, "ChuyenXe not found"));
    }
    res.json(updatedChuyenXe);
  } catch (error) {
    next(new ApiError(500, `Error updating ChuyenXe: ${error.message}`));
  }
};

exports.deleteChuyenXe = async (req, res, next) => {
  try {
    const deletedChuyenXe = await chuyenXeService.deleteChuyenXe(req.params.id);
    if (!deletedChuyenXe) {
      return next(new ApiError(404, "ChuyenXe not found"));
    }
    res.status(204).send();
  } catch (error) {
    next(new ApiError(500, `Error deleting ChuyenXe: ${error.message}`));
  }
};

exports.deleteAllChuyenXes = async (req, res, next) => {
  try {
    await chuyenXeService.deleteAllChuyenXes();
    res.status(204).send();
  } catch (error) {
    next(new ApiError(500, `Error deleting all ChuyenXes: ${error.message}`));
  }
};

exports.searchChuyenXe = async (req, res) => {
  try {
    const { departure_city, arrival_city, departure_date } = req.query;

    // Validate input
    if (!departure_city || !arrival_city || !departure_date) {
      return res.status(400).json({
        message:
          "Vui lòng cung cấp đầy đủ thông tin thành phố đi, thành phố đến và ngày khởi hành",
      });
    }

    // Validate date format
    const parsedDate = new Date(departure_date);
    if (isNaN(parsedDate.getTime())) {
      return res.status(400).json({
        message:
          "Định dạng ngày không hợp lệ. Vui lòng sử dụng định dạng YYYY-MM-DD",
      });
    }

    // Call the searchChuyenXe function
    const availableChuyenXe = await chuyenXeService.searchChuyenXe(
      departure_city,
      arrival_city,
      parsedDate
    );

    // Return the results
    res.status(200).json({
      message: "Tìm kiếm chuyến xe thành công",
      data: availableChuyenXe,
    });
  } catch (error) {
    res.status(500).json({
      message: "Đã xảy ra lỗi khi tìm kiếm chuyến xe",
      error: error.message,
    });
  }
};
