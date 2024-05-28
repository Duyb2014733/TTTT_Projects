const Payment = require("../models/Payment.model");

class PaymentService {
  // Tạo một thanh toán mới
  async createPayment(paymentData) {
    try {
      const payment = new Payment(paymentData);
      return await payment.save();
    } catch (error) {
      throw error;
    }
  }

  // Lấy thông tin của một thanh toán dựa trên ID
  async getPaymentById(paymentId) {
    try {
      return await Payment.findById(paymentId).populate("booking_id");
    } catch (error) {
      throw error;
    }
  }

  // Lấy danh sách tất cả các thanh toán
  async getAllPayments() {
    try {
      return await Payment.find().populate("booking_id");
    } catch (error) {
      throw error;
    }
  }

  // Cập nhật thông tin của một thanh toán
  async updatePayment(paymentId, paymentData) {
    try {
      return await Payment.findByIdAndUpdate(paymentId, paymentData, {
        new: true,
      }).populate("booking_id");
    } catch (error) {
      throw error;
    }
  }

  // Xóa một thanh toán dựa trên ID
  async deletePayment(paymentId) {
    try {
      return await Payment.findByIdAndDelete(paymentId);
    } catch (error) {
      throw error;
    }
  }

  // Xóa tất cả các thanh toán
  async deleteAllPayments() {
    try {
      return await Payment.deleteMany({});
    } catch (error) {
      throw error;
    }
  }
}

module.exports = PaymentService;
