const UserService = require("../services/User.service");
const ApiError = require("../api-error");
const bcrypt = require("bcrypt");

const userService = new UserService();

exports.registerUser = async (req, res, next) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(req.body.password, salt);
    const newUser = await userService.createUser(userData);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await userService.getUserById(userId);
    if (!user) {
      return next(new ApiError(404, "User not found"));
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const userData = req.body;
    const updatedUser = await userService.updateUser(userId, userData);
    if (!updatedUser) {
      return next(new ApiError(404, "User not found"));
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const deletedUser = await userService.deleteUser(userId);
    if (!deletedUser) {
      return next(new ApiError(404, "User not found"));
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

exports.deleteAllUsers = async (req, res, next) => {
  try {
    await userService.deleteAllUsers();
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
