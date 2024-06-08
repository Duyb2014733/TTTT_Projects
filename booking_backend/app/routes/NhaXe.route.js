const express = require("express");
const router = express.Router();
const nhaXeController = require("../controllers/NhaXe.controller");

router
  .route("/")
  .post(nhaXeController.createNhaXe)
  .get(nhaXeController.getAllNhaXes)
  .delete(nhaXeController.deleteAllNhaXes);

router
  .route("/:id")
  .get(nhaXeController.getNhaXeById)
  .put(nhaXeController.updateNhaXe)
  .delete(nhaXeController.deleteNhaXe);

module.exports = router;
