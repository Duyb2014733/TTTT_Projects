const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/Payment.controller");

router
  .route("/")
  .post(paymentController.createPayment)
  .get(paymentController.getAllPayments)
  .delete(paymentController.deleteAllPayments);

router
  .route("/:id")
  .get(paymentController.getPaymentById)
  .put(paymentController.updatePayment)
  .delete(paymentController.deletePayment);

module.exports = router;
