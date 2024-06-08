const express = require("express");
const router = express.Router();
const thanhToanController = require("../controllers/ThanhToan.controller");

router
  .route("/")
  .post(thanhToanController.createThanhToan)
  .get(thanhToanController.getAllThanhToans)
  .delete(thanhToanController.deleteAllThanhToans);

router
  .route("/:id")
  .get(thanhToanController.getThanhToanById)
  .put(thanhToanController.updateThanhToan)
  .delete(thanhToanController.deleteThanhToan);

module.exports = router;
