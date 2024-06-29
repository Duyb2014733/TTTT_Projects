const express = require("express");
const router = express.Router();
const middlewareController = require("../controllers/Middleware.controller");
const khachHangController = require("../controllers/KhachHang.controller");

router
  .route("/")
  .post(khachHangController.registerKhachHang)
  .get(khachHangController.getAllKhachHangs)
  .delete(
    middlewareController.verifyTokenAndAdmin,
    khachHangController.deleteAllKhachHangs
  );

router
  .route("/:id")
  .get(khachHangController.getKhachHangById)
  .put(middlewareController.verifyToken, khachHangController.updateKhachHang)
  .delete(
    middlewareController.verifyToken,
    khachHangController.deleteKhachHang
  );

router.route("/login").post(khachHangController.loginKhachHang);

router.route("/logout").post(khachHangController.logoutKhachHang);

module.exports = router;
