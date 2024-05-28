const RideService = require("../services/Ride.service");
const ApiError = require("../utils/ApiError");

const rideService = new RideService();

exports.createRide = async (req, res, next) => {
  try {
    const rideData = req.body;
    const newRide = await rideService.createRide(rideData);
    res.status(201).json(newRide);
  } catch (error) {
    next(new ApiError(500, error.message));
  }
};

exports.getRideById = async (req, res, next) => {
  try {
    const rideId = req.params.id;
    const ride = await rideService.getRideById(rideId);
    if (!ride) {
      return next(new ApiError(404, "Ride not found"));
    }
    res.status(200).json(ride);
  } catch (error) {
    next(new ApiError(500, error.message));
  }
};

exports.getAllRides = async (req, res, next) => {
  try {
    const rides = await rideService.getAllRides();
    res.status(200).json(rides);
  } catch (error) {
    next(new ApiError(500, error.message));
  }
};

exports.updateRide = async (req, res, next) => {
  try {
    const rideId = req.params.id;
    const rideData = req.body;
    const updatedRide = await rideService.updateRide(rideId, rideData);
    if (!updatedRide) {
      return next(new ApiError(404, "Ride not found"));
    }
    res.status(200).json(updatedRide);
  } catch (error) {
    next(new ApiError(500, error.message));
  }
};

exports.deleteRide = async (req, res, next) => {
  try {
    const rideId = req.params.id;
    const deletedRide = await rideService.deleteRide(rideId);
    if (!deletedRide) {
      return next(new ApiError(404, "Ride not found"));
    }
    res.status(204).send();
  } catch (error) {
    next(new ApiError(500, error.message));
  }
};

exports.deleteAllRides = async (req, res, next) => {
  try {
    await rideService.deleteAllRides();
    res.status(204).send();
  } catch (error) {
    next(new ApiError(500, error.message));
  }
};
