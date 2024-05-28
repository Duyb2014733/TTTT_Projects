const BusStationService = require("../services/BusStation.service");
const ApiError = require("../utils/ApiError");

const busStationService = new BusStationService();

exports.createBusStation = async (req, res, next) => {
  try {
    const busStationData = req.body;
    const newBusStation =
      await busStationService.createBusStation(busStationData);
    res.status(201).json(newBusStation);
  } catch (error) {
    next(new ApiError(500, error.message));
  }
};

exports.getBusStationById = async (req, res, next) => {
  try {
    const busStationId = req.params.id;
    const busStation = await busStationService.getBusStationById(busStationId);
    if (!busStation) {
      return next(new ApiError(404, "Bus station not found"));
    }
    res.status(200).json(busStation);
  } catch (error) {
    next(new ApiError(500, error.message));
  }
};

exports.getAllBusStations = async (req, res, next) => {
  try {
    const busStations = await busStationService.getAllBusStations();
    res.status(200).json(busStations);
  } catch (error) {
    next(new ApiError(500, error.message));
  }
};

exports.updateBusStation = async (req, res, next) => {
  try {
    const busStationId = req.params.id;
    const busStationData = req.body;
    const updatedBusStation = await busStationService.updateBusStation(
      busStationId,
      busStationData
    );
    if (!updatedBusStation) {
      return next(new ApiError(404, "Bus station not found"));
    }
    res.status(200).json(updatedBusStation);
  } catch (error) {
    next(new ApiError(500, error.message));
  }
};

exports.deleteBusStation = async (req, res, next) => {
  try {
    const busStationId = req.params.id;
    const deletedBusStation =
      await busStationService.deleteBusStation(busStationId);
    if (!deletedBusStation) {
      return next(new ApiError(404, "Bus station not found"));
    }
    res.status(204).send();
  } catch (error) {
    next(new ApiError(500, error.message));
  }
};

exports.deleteAllBusStations = async (req, res, next) => {
  try {
    await busStationService.deleteAllBusStations();
    res.status(204).send();
  } catch (error) {
    next(new ApiError(500, error.message));
  }
};
