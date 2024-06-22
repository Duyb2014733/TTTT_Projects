const express = require("express");
const router = express.Router();
const middlewareController = require("../controllers/Middleware.controller");
const thanhToanController = require("../controllers/ThanhToan.controller");

router
  .route("/")
  .post(
    middlewareController.verifyTokenAndAdmin,
    thanhToanController.createThanhToan
  )
  .get(middlewareController.verifyToken, thanhToanController.getAllThanhToans)
  .delete(
    middlewareController.verifyTokenAndAdmin,
    thanhToanController.deleteAllThanhToans
  );

router
  .route("/:id")
  .get(middlewareController.verifyToken, thanhToanController.getThanhToanById)
  .put(middlewareController.verifyToken, thanhToanController.updateThanhToan)
  .delete(
    middlewareController.verifyToken,
    thanhToanController.deleteThanhToan
  );

module.exports = router;
