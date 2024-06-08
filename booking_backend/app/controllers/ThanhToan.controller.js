const ThanhToanService = require("../services/ThanhToan.service");
const ApiError = require("../api-error");

exports.createThanhToan = async (req, res, next) => {
  try {
    const thanhToanData = req.body;
    const newThanhToan = await ThanhToanService.createThanhToan(thanhToanData);
    res.status(201).json(newThanhToan);
  } catch (error) {
    next(new ApiError(500, error.message));
  }
};

exports.getThanhToanById = async (req, res, next) => {
  try {
    const thanhToanId = req.params.id;
    const ThanhToan = await ThanhToanService.getThanhToanById(thanhToanId);
    if (!ThanhToan) {
      return next(new ApiError(404, "ThanhToan not found"));
    }
    res.status(200).json(ThanhToan);
  } catch (error) {
    next(new ApiError(500, error.message));
  }
};

exports.getAllThanhToans = async (req, res, next) => {
  try {
    const ThanhToans = await ThanhToanService.getAllThanhToans();
    res.status(200).json(ThanhToans);
  } catch (error) {
    next(new ApiError(500, error.message));
  }
};

exports.updateThanhToan = async (req, res, next) => {
  try {
    const thanhToanId = req.params.id;
    const thanhToanData = req.body;
    const updatedThanhToan = await ThanhToanService.updateThanhToan(
      thanhToanId,
      thanhToanData
    );
    if (!updatedThanhToan) {
      return next(new ApiError(404, "ThanhToan not found"));
    }
    res.status(200).json(updatedThanhToan);
  } catch (error) {
    next(new ApiError(500, error.message));
  }
};

exports.deleteThanhToan = async (req, res, next) => {
  try {
    const thanhToanId = req.params.id;
    const deletedThanhToan =
      await ThanhToanService.deleteThanhToan(thanhToanId);
    if (!deletedThanhToan) {
      return next(new ApiError(404, "ThanhToan not found"));
    }
    res.status(204).send();
  } catch (error) {
    next(new ApiError(500, error.message));
  }
};

exports.deleteAllThanhToans = async (req, res, next) => {
  try {
    await ThanhToanService.deleteAllThanhToans();
    res.status(204).send();
  } catch (error) {
    next(new ApiError(500, error.message));
  }
};
