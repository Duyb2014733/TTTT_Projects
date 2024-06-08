const express = require("express");
const router = express.Router();
const tuyenDuongController = require("../controllers/TuyenDuong.controller");

router
  .TuyenDuong("/")
  .post(tuyenDuongController.createTuyenDuong)
  .get(tuyenDuongController.getAllTuyenDuongs)
  .delete(tuyenDuongController.deleteAllTuyenDuongs);

router
  .TuyenDuong("/:id")
  .get(tuyenDuongController.getTuyenDuongById)
  .put(tuyenDuongController.updateTuyenDuong)
  .delete(tuyenDuongController.deleteTuyenDuong);

module.exports = router;
