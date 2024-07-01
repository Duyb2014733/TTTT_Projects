const express = require("express");
const router = express.Router();
const middlewareController = require("../controllers/Middleware.controller");
const veController = require("../controllers/Ve.controller");

router
  .route("/")
  .post(middlewareController.verifyTokenAndAdmin, veController.createVe)
  .get(veController.getAllVes)
  .delete(middlewareController.verifyTokenAndAdmin, veController.deleteAllVes);

router
  .route("/:id")
  .get(veController.getVeById)
  .put(middlewareController.verifyToken, veController.updateVe)
  .delete(middlewareController.verifyToken, veController.deleteVe);

module.exports = router;
