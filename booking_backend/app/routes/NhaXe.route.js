const express = require("express");
const router = express.Router();
const middlewareController = require("../controllers/Middleware.controller");
const nhaXeController = require("../controllers/NhaXe.controller");

router
  .route("/")
  .post(middlewareController.verifyTokenAndAdmin, nhaXeController.createNhaXe)
  .get(middlewareController.verifyToken, nhaXeController.getAllNhaXes)
  .delete(
    middlewareController.verifyTokenAndAdmin,
    nhaXeController.deleteAllNhaXes
  );

router
  .route("/:id")
  .get(middlewareController.verifyToken, nhaXeController.getNhaXeById)
  .put(middlewareController.verifyToken, nhaXeController.updateNhaXe)
  .delete(middlewareController.verifyToken, nhaXeController.deleteNhaXe);

module.exports = router;
