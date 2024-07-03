const VeService = require("../services/Ve.service");
const ApiError = require("../api-error");

const veService = new VeService();

exports.createVe = async (req, res, next) => {
  try {
    const veData = req.body;
    const newVe = await veService.createVe(veData);
    res.status(201).json(newVe);
  } catch (error) {
    next(error);
  }
};

exports.getVeById = async (req, res, next) => {
  try {
    const veId = req.params.id;
    const Ve = await veService.getVeById(veId);
    if (!Ve) {
      return next(new ApiError(404, "Ve not found"));
    }
    res.status(200).json(Ve);
  } catch (error) {
    next(error);
  }
};

exports.getAllVes = async (req, res, next) => {
  try {
    const Ves = await veService.getAllVes();
    res.status(200).json(Ves);
  } catch (error) {
    next(error);
  }
};

exports.updateVe = async (req, res, next) => {
  try {
    const veId = req.params.id;
    const veData = req.body;
    const updatedVe = await veService.updateVe(veId, veData);
    if (!updatedVe) {
      return next(new ApiError(404, "Ve not found"));
    }
    res.status(200).json(updatedVe);
  } catch (error) {
    next(error);
  }
};

exports.deleteVe = async (req, res, next) => {
  try {
    const veId = req.params.id;
    const deletedVe = await veService.deleteVe(veId);
    if (!deletedVe) {
      return next(new ApiError(404, "Ve not found"));
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

exports.deleteAllVes = async (req, res, next) => {
  try {
    await veService.deleteAllVes();
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

exports.getVeIdByViTriGheId = async (req, res, next) => {
  const { viTriGheId } = req.params;
  try {
    const veId = await veService.getVeIdByViTriGheId(viTriGheId);
    res.json(veId);
  } catch (error) {
    next(error);
  }
};
