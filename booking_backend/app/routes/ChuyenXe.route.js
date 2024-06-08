const express = require("express");
const router = express.Router();
const chuyenXeController = require("../controllers/ChuyenXe.controller");

router
  .route("/")
  .post(chuyenXeController.createChuyenXe)
  .get(chuyenXeController.getAllChuyenXes)
  .delete(chuyenXeController.deleteAllChuyenXes);

router
  .route("/:id")
  .get(chuyenXeController.getChuyenXeById)
  .put(chuyenXeController.updateChuyenXe)
  .delete(chuyenXeController.deleteChuyenXe);

module.exports = router;
