const express = require("express");
const cors = require("cors");
const KhachHangRouter = require("./app/routes/KhachHang.route");
const ChuyenXeRouter = require("./app/routes/ChuyenXe.route");
const NhaXeRouter = require("./app/routes/NhaXe.route");
const XeRouter = require("./app/routes/Xe.route");
const ThanhToanRouter = require("./app/routes/ThanhToan.route");
const TuyenDuongRouter = require("./app/routes/TuyenDuong.route");
const VeRouter = require("./app/routes/Ve.route");
const ApiError = require("./app/api-error");
require("dotenv").config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Chào mừng bạn đến để kết nối ứng dụng đặt vé." });
});

app.use("/api/khachhang/", KhachHangRouter);
app.use("/api/chuyenxe/", ChuyenXeRouter);
app.use("/api/nhaxe/", NhaXeRouter);
app.use("/api/thanhtoan/", ThanhToanRouter);
app.use("/api/tuyenduong/", TuyenDuongRouter);
app.use("/api/ve/", VeRouter);
app.use("/api/xe/", XeRouter);
app.use("/api/chuyenxe/uploads", express.static("uploads"));

app.use((req, res, next) => {
  return next(new ApiError(404, "Không tìm thấy tài nguyên"));
});

app.use((err, req, res, next) => {
  return res.status(err.statusCode || 500).json({
    message: err.message || "Lỗi máy chủ nội bộ",
  });
});

module.exports = app;
