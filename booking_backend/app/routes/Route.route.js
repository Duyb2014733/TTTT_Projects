const express = require("express");
const router = express.Router();
const RouteController = require("../controllers/Route.controller");

// Định nghĩa các tuyến đường
router
  .route("/")
  .post(RouteController.createRoute)
  .get(RouteController.getAllRoutes)
  .delete(RouteController.deleteAllRoutes);

router
  .route("/:id")
  .get(RouteController.getRouteById)
  .put(RouteController.updateRoute)
  .delete(RouteController.deleteRoute);

module.exports = router;
