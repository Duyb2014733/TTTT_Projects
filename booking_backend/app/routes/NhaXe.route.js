const express = require("express");
const router = express.Router();
const middlewareController = require("../controllers/Middleware.controller");
const nhaXeController = require("../controllers/NhaXe.controller");

router
  .route("/")
  .post(middlewareController.verifyTokenAndAdmin, nhaXeController.createNhaXe)
  .get(nhaXeController.getAllNhaXe);

router
  .route("/id")
  .get(nhaXeController.getNhaXeById)
  .put(middlewareController.verifyTokenAndAdmin, nhaXeController.updateNhaXe)
  .delete(
    middlewareController.verifyTokenAndAdmin,
    nhaXeController.deleteNhaXe
  );

module.exports = router;
