const express = require("express");
const router = express.Router();
const middlewareController = require("../controllers/Middleware.controller");
const veController = require("../controllers/Ve.controller");

router
  .route("/")
  .post(middlewareController.verifyTokenAndAdmin, veController.createVe)
  .get(middlewareController.verifyToken, veController.getAllVes)
  .delete(middlewareController.verifyTokenAndAdmin, veController.deleteAllVes);

router
  .route("/:id")
  .get(middlewareController.verifyToken, veController.getVeById)
  .put(middlewareController.verifyToken, veController.updateVe)
  .delete(middlewareController.verifyToken, veController.deleteVe);

module.exports = router;
