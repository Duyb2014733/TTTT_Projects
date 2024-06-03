const UserService = require("../services/User.service");
const ApiError = require("../api-error");
const bcrypt = require("bcrypt");

const userService = new UserService();

exports.registerUser = async (req, res, next) => {
  try {
    // Tạo salt để hash password
    const salt = await bcrypt.genSalt(10);
    // Hash password sử dụng salt
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Tạo một đối tượng người dùng mới với password đã hash
    const newUser = await userService.createUser({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      password: hashedPassword, // Sử dụng password đã hash
    });

    // Trả về thông tin của người dùng mới đã tạo
    res.status(201).json(newUser);
  } catch (error) {
    // Nếu có lỗi xảy ra, chuyển đến middleware xử lý lỗi tiếp theo
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
