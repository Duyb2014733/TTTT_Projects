const ChuyenXeService = require("../services/ChuyenXe.service");
const upload = require("../middlewares/upload");
const ApiError = require("../api-error");

const chuyenXeService = new ChuyenXeService();

exports.createChuyenXe = async (req, res, next) => {
  upload(req, res, async (err) => {
    if (err) {
      return next(ApiError.badRequest(err.message));
    }

    try {
      const imagePath = req.file ? req.file.path : null;
      const chuyenXeData = req.body;
      const newChuyenXe = await chuyenXeService.createChuyenXe(
        chuyenXeData,
        imagePath
      );
      res.status(201).json(newChuyenXe);
    } catch (error) {
      next(ApiError.internal(error.message));
    }
  });
};

exports.getChuyenXeById = async (req, res, next) => {
  try {
    const chuyenXeId = req.params.id;
    const chuyenXe = await chuyenXeService.getChuyenXeById(chuyenXeId);
    if (!chuyenXe) {
      return next(new ApiError(404, "ChuyenXe not found"));
    }
    res.status(200).json(chuyenXe);
  } catch (error) {
    next(new ApiError(500, error.message));
  }
};

exports.getAllChuyenXes = async (req, res, next) => {
  try {
    const chuyenXes = await chuyenXeService.getAllChuyenXes();
    res.status(200).json(chuyenXes);
  } catch (error) {
    next(new ApiError(500, error.message));
  }
};

exports.updateChuyenXe = async (req, res, next) => {
  try {
    const chuyenXeId = req.params.id;
    const chuyenXeData = req.body;
    const updatedChuyenXe = await chuyenXeService.updateChuyenXe(
      chuyenXeId,
      chuyenXeData
    );
    if (!updatedChuyenXe) {
      return next(new ApiError(404, "ChuyenXe not found"));
    }
    res.status(200).json(updatedChuyenXe);
  } catch (error) {
    next(new ApiError(500, error.message));
  }
};

exports.deleteChuyenXe = async (req, res, next) => {
  try {
    const chuyenXeId = req.params.id;
    const deletedChuyenXe = await chuyenXeService.deleteChuyenXe(chuyenXeId);
    if (!deletedChuyenXe) {
      return next(new ApiError(404, "ChuyenXe not found"));
    }
    res.status(204).send();
  } catch (error) {
    next(new ApiError(500, error.message));
  }
};

exports.deleteAllChuyenXes = async (req, res, next) => {
  try {
    await chuyenXeService.deleteAllChuyenXes();
    res.status(204).send();
  } catch (error) {
    next(new ApiError(500, error.message));
  }
};

exports.searchTrips = async (req, res) => {
  try {
    const searchCriteria = req.body;
    const trips = await chuyenXeService.searchTrips(searchCriteria);
    res.status(200).json(trips);
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while searching for trips",
      error: error.message,
    });
  }
};
