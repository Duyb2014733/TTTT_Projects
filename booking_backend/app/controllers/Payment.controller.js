const PaymentService = require("../services/Payment.service");
const ApiError = require("../api-error");

const paymentService = new PaymentService();

exports.createPayment = async (req, res, next) => {
  try {
    const paymentData = req.body;
    const newPayment = await paymentService.createPayment(paymentData);
    res.status(201).json(newPayment);
  } catch (error) {
    next(new ApiError(500, error.message));
  }
};

exports.getPaymentById = async (req, res, next) => {
  try {
    const paymentId = req.params.id;
    const payment = await paymentService.getPaymentById(paymentId);
    if (!payment) {
      return next(new ApiError(404, "Payment not found"));
    }
    res.status(200).json(payment);
  } catch (error) {
    next(new ApiError(500, error.message));
  }
};

exports.getAllPayments = async (req, res, next) => {
  try {
    const payments = await paymentService.getAllPayments();
    res.status(200).json(payments);
  } catch (error) {
    next(new ApiError(500, error.message));
  }
};

exports.updatePayment = async (req, res, next) => {
  try {
    const paymentId = req.params.id;
    const paymentData = req.body;
    const updatedPayment = await paymentService.updatePayment(
      paymentId,
      paymentData
    );
    if (!updatedPayment) {
      return next(new ApiError(404, "Payment not found"));
    }
    res.status(200).json(updatedPayment);
  } catch (error) {
    next(new ApiError(500, error.message));
  }
};

exports.deletePayment = async (req, res, next) => {
  try {
    const paymentId = req.params.id;
    const deletedPayment = await paymentService.deletePayment(paymentId);
    if (!deletedPayment) {
      return next(new ApiError(404, "Payment not found"));
    }
    res.status(204).send();
  } catch (error) {
    next(new ApiError(500, error.message));
  }
};

exports.deleteAllPayments = async (req, res, next) => {
  try {
    await paymentService.deleteAllPayments();
    res.status(204).send();
  } catch (error) {
    next(new ApiError(500, error.message));
  }
};
