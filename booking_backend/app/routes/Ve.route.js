const express = require("express");
const router = express.Router();
const veController = require("../controllers/Ve.controller");

router
  .route("/")
  .post(veController.createVe)
  .get(veController.getAllVes)
  .delete(veController.deleteAllVes);

router
  .route("/:id")
  .get(veController.getVeById)
  .put(veController.updateVe)
  .delete(veController.deleteVe);

module.exports = router;
