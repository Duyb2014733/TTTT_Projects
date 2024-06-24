const express = require("express");
const router = express.Router();
const middlewareController = require("../controllers/Middleware.controller");
const xeController = require("../controllers/Xe.controller");

router.get("/", xeController.getAllXe);
router.get("/:id", xeController.getXeById);
router.post(
  "/",
  middlewareController.verifyTokenAndAdmin,
  xeController.createXe
);
router.put(
  "/:id",
  middlewareController.verifyTokenAndAdmin,
  xeController.updateXe
);
router.delete(
  "/:id",
  middlewareController.verifyTokenAndAdmin,
  xeController.deleteXe
);

module.exports = router;
