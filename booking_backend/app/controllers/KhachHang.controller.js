const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const KhachHangService = require("../services/KhachHang.service");
const KhachHang = require("../models/KhachHang.model");
const ApiError = require("../api-error");

const khachHangService = new KhachHangService();

exports.registerKhachHang = async (req, res, next) => {
  try {
    // Tạo salt để hash password
    const salt = await bcrypt.genSalt(10);
    // Hash password sử dụng salt
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Tạo một đối tượng người dùng mới với password đã hash
    const newKhachHang = await KhachHang.create({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      password: hashedPassword, // Sử dụng password đã hash
    });

    // Trả về thông tin của người dùng mới đã tạo
    res.status(201).json(newKhachHang);
  } catch (error) {
    // Nếu có lỗi xảy ra, chuyển đến middleware xử lý lỗi tiếp theo
    next(error);
  }
};

exports.loginKhachHang = async (req, res, next) => {
  try {
    // Tìm người dùng theo email
    const khachhang = await KhachHang.findOne({ email: req.body.email });
    if (!khachhang) {
      return res.status(404).json("Invalid email or password.");
    }

    // So sánh password từ request với password đã hash trong cơ sở dữ liệu
    const validPassword = await bcrypt.compare(
      req.body.password,
      khachhang.password
    );
    if (!validPassword) {
      return res.status(404).json("Invalid email or password.");
    }

    // Nếu email và password đúng, trả về thông tin người dùng
    if (khachhang && validPassword) {
      const accessToken = jwt.sign(
        {
          _id: khachhang._id,
          admin: khachhang.admin,
        },
        process.env.JWT_ACCESS_KEY,
        { expiresIn: "30d" }
      );

      const refreshToken = jwt.sign(
        {
          _id: khachhang._id,
          admin: khachhang.admin,
        },
        process.env.JWT_REFRESH_KEY,
        { expiresIn: "365d" }
      );

      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
      });

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
      });

      res.cookie("isAdmin", khachhang.admin.toString(), {
        // Chuyển đổi thành chuỗi để lưu vào cookie
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
      });

      const { password, ...others } = khachhang._doc;
      return res.status(200).json({ ...others, accessToken });
    }
  } catch (error) {
    // Nếu có lỗi xảy ra, chuyển đến middleware xử lý lỗi tiếp theo
    next(error);
  }
};

exports.logoutKhachHang = (req, res) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: false,
    path: "/",
    sameSite: "strict",
  });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: false,
    path: "/",
    sameSite: "strict",
  });
  res.clearCookie("isAdmin", {
    // Xóa cookie isAdmin khi đăng xuất
    httpOnly: true,
    secure: false,
    path: "/",
    sameSite: "strict",
  });
  return res.status(200).json("Logged out successfully.");
};

exports.getKhachHangById = async (req, res, next) => {
  try {
    const khachHangId = req.params.id;
    const khachHang = await khachHangService.getKhachHangById(khachHangId);
    if (!khachHang) {
      return next(new ApiError(404, "KhachHang not found"));
    }
    res.status(200).json(khachHang);
  } catch (error) {
    next(error);
  }
};

exports.getAllKhachHangs = async (req, res, next) => {
  try {
    const khachHangs = await khachHangService.getAllKhachHangs();
    res.status(200).json(khachHangs);
  } catch (error) {
    next(error);
  }
};

exports.updateKhachHang = async (req, res, next) => {
  try {
    const khachHangId = req.params.id;
    const khachHangData = req.body;
    const updatedKhachHang = await khachHangService.updateKhachHang(
      khachHangId,
      khachHangData
    );
    if (!updatedKhachHang) {
      return next(new ApiError(404, "KhachHang not found"));
    }
    res.status(200).json(updatedKhachHang);
  } catch (error) {
    next(error);
  }
};

exports.deleteKhachHang = async (req, res, next) => {
  try {
    const khachHangId = req.params.id;
    const deletedKhachHang =
      await khachHangService.deleteKhachHang(khachHangId);
    if (!deletedKhachHang) {
      return next(new ApiError(404, "KhachHang not found"));
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

exports.deleteAllKhachHangs = async (req, res, next) => {
  try {
    await khachHangService.deleteAllKhachHangs();
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
