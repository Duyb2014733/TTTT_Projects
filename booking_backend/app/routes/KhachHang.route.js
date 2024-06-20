const express = require("express");
const router = express.Router();
const middlewareController = require("../controllers/Middleware.controller");
const khachHangController = require("../controllers/KhachHang.controller");

// Route to handle registration and fetching all customers, requires admin privileges for GET and DELETE
router
  .route("/")
  .post(khachHangController.registerKhachHang)
  .get(
    middlewareController.verifyTokenAndAdmin,
    khachHangController.getAllKhachHangs
  )
  .delete(
    middlewareController.verifyTokenAndAdmin,
    khachHangController.deleteAllKhachHangs
  );

// Route to handle specific customer actions based on ID
router
  .route("/:id")
  .get(middlewareController.verifyToken, khachHangController.getKhachHangById)
  .put(middlewareController.verifyToken, khachHangController.updateKhachHang)
  .delete(
    middlewareController.verifyToken,
    khachHangController.deleteKhachHang
  );

// Route for customer login
router.route("/login").post(khachHangController.loginKhachHang);

// Route for customer logout
router.route("/logout").post(khachHangController.logoutKhachHang);

module.exports = router;
