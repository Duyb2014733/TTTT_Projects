const express = require("express");
const router = express.Router();
const userController = require("../controllers/User.controller");

router
  .route("/")
  .post(userController.createUser)
  .get(userController.getAllUsers)
  .delete(userController.deleteAllUsers);

router
  .route("/:id")
  .get(userController.getUserById)
  .put(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
