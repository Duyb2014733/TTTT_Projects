const express = require("express");
const router = express.Router();
const khachHangController = require("../controllers/KhachHang.controller");

router
  .route("/")
  .post(khachHangController.registerKhachHang)
  .get(khachHangController.getAllKhachHangs)
  .delete(khachHangController.deleteAllKhachHangs);

router
  .route("/:id")
  .get(khachHangController.getKhachHangById)
  .put(khachHangController.updateKhachHang)
  .delete(khachHangController.deleteKhachHang);

module.exports = router;
