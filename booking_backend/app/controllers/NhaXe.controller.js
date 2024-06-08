const NhaXeService = require("../services/NhaXe.service");
const ApiError = require("../api-error");

const nhaXeService = new NhaXeService();

exports.createNhaXe = async (req, res, next) => {
  try {
    const nhaXeData = req.body;
    const newNhaXe = await nhaXeService.createNhaXe(nhaXeData);
    res.status(201).json(newNhaXe);
  } catch (error) {
    next(new ApiError(500, error.message));
  }
};

exports.getNhaXeById = async (req, res, next) => {
  try {
    const nhaXeId = req.params.id;
    const nhaXe = await nhaXeService.getNhaXeById(nhaXeId);
    if (!nhaXe) {
      return next(new ApiError(404, "Bus station not found"));
    }
    res.status(200).json(nhaXe);
  } catch (error) {
    next(new ApiError(500, error.message));
  }
};

exports.getAllNhaXes = async (req, res, next) => {
  try {
    const nhaXes = await nhaXeService.getAllNhaXe();
    res.status(200).json(nhaXes);
  } catch (error) {
    next(new ApiError(500, error.message));
  }
};

exports.updateNhaXe = async (req, res, next) => {
  try {
    const nhaXeId = req.params.id;
    const nhaXeData = req.body;
    const updatedNhaXe = await nhaXeService.updateNhaXe(nhaXeId, nhaXeData);
    if (!updatedNhaXe) {
      return next(new ApiError(404, "Bus station not found"));
    }
    res.status(200).json(updatedNhaXe);
  } catch (error) {
    next(new ApiError(500, error.message));
  }
};

exports.deleteNhaXe = async (req, res, next) => {
  try {
    const nhaXeId = req.params.id;
    const deletedNhaXe = await nhaXeService.deleteNhaXe(nhaXeId);
    if (!deletedNhaXe) {
      return next(new ApiError(404, "Bus station not found"));
    }
    res.status(204).send();
  } catch (error) {
    next(new ApiError(500, error.message));
  }
};

exports.deleteAllNhaXes = async (req, res, next) => {
  try {
    await nhaXeService.deleteAllNhaXe();
    res.status(204).send();
  } catch (error) {
    next(new ApiError(500, error.message));
  }
};
