const express = require("express");
const router = express.Router();
const tuyenDuongController = require("../controllers/TuyenDuong.controller");

router
  .route("/")
  .post(tuyenDuongController.createTuyenDuong)
  .get(tuyenDuongController.getAllTuyenDuongs)
  .delete(tuyenDuongController.deleteAllTuyenDuongs);

router
  .route("/:id")
  .get(tuyenDuongController.getTuyenDuongById)
  .put(tuyenDuongController.updateTuyenDuong)
  .delete(tuyenDuongController.deleteTuyenDuong);

module.exports = router;
