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
      console.log("ChuyenXe data:", chuyenXeData);
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

exports.searchTrips = async (req, res, next) => {
  try {
    const trips = await chuyenXeService.searchTrips(req.body);
    res.json(trips);
  } catch (error) {
    next(new ApiError(500, `Error searching trips: ${error.message}`));
  }
};
