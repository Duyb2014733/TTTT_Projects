const express = require("express");
const router = express.Router();
const middlewareController = require("../controllers/Middleware.controller");
const chuyenXeController = require("../controllers/ChuyenXe.controller");

router
  .route("/")
  .post(
    middlewareController.verifyTokenAndAdmin,
    chuyenXeController.createChuyenXe
  )
  .get(middlewareController.verifyToken, chuyenXeController.getAllChuyenXes)
  .delete(
    middlewareController.verifyTokenAndAdmin,
    chuyenXeController.deleteAllChuyenXes
  );

router
  .route("/:id")
  .get(middlewareController.verifyToken, chuyenXeController.getChuyenXeById)
  .put(middlewareController.verifyToken, chuyenXeController.updateChuyenXe)
  .delete(middlewareController.verifyToken, chuyenXeController.deleteChuyenXe);

router.post("/search", chuyenXeController.searchTrips);

module.exports = router;
