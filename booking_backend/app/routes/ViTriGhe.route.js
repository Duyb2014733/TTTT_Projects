const express = require("express");
const router = express.Router();
const middlewareController = require("../controllers/Middleware.controller");
const viTriGheController = require("../controllers/ViTriGhe.controller");

router
  .route("/")
  .post(
    middlewareController.verifyTokenAndAdmin,
    viTriGheController.createViTriGhe
  )
  .get(viTriGheController.getAllViTriGhe);

router
  .route("/:id")
  .get(viTriGheController.getViTriGheById)
  .put(middlewareController.verifyToken, viTriGheController.updateViTriGhe)
  .delete(middlewareController.verifyToken, viTriGheController.deleteViTriGhe);

module.exports = router;
