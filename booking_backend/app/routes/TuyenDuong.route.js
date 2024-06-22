const express = require("express");
const router = express.Router();
const middlewareController = require("../controllers/Middleware.controller");
const tuyenDuongController = require("../controllers/TuyenDuong.controller");

router
  .route("/")
  .post(
    middlewareController.verifyTokenAndAdmin,
    tuyenDuongController.createTuyenDuong
  )
  .get(middlewareController.verifyToken, tuyenDuongController.getAllTuyenDuongs)
  .delete(
    middlewareController.verifyTokenAndAdmin,
    tuyenDuongController.deleteAllTuyenDuongs
  );

router
  .route("/:id")
  .get(middlewareController.verifyToken, tuyenDuongController.getTuyenDuongById)
  .put(middlewareController.verifyToken, tuyenDuongController.updateTuyenDuong)
  .delete(
    middlewareController.verifyToken,
    tuyenDuongController.deleteTuyenDuong
  );

module.exports = router;
