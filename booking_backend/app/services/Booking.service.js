const Booking = require("../models/Booking.model");

class BookingService {
  // Tạo một booking mới
  async createBooking(bookingData) {
    try {
      const booking = new Booking(bookingData);
      return await booking.save();
    } catch (error) {
      throw error;
    }
  }

  // Lấy thông tin của một booking dựa trên ID
  async getBookingById(bookingId) {
    try {
      return await Booking.findById(bookingId)
        .populate("user_id")
        .populate("ride_id")
        .populate("payment_id")
        .populate("review_id")
        .populate("ticket_id");
    } catch (error) {
      throw error;
    }
  }

  // Lấy danh sách tất cả các bookings
  async getAllBookings() {
    try {
      return await Booking.find()
        .populate("user_id")
        .populate("ride_id")
        .populate("payment_id")
        .populate("review_id")
        .populate("ticket_id");
    } catch (error) {
      throw error;
    }
  }

  // Cập nhật thông tin của một booking
  async updateBooking(bookingId, bookingData) {
    try {
      return await Booking.findByIdAndUpdate(bookingId, bookingData, {
        new: true,
      })
        .populate("user_id")
        .populate("ride_id")
        .populate("payment_id")
        .populate("review_id")
        .populate("ticket_id");
    } catch (error) {
      throw error;
    }
  }

  // Xóa một booking dựa trên ID
  async deleteBooking(bookingId) {
    try {
      return await Booking.findByIdAndDelete(bookingId);
    } catch (error) {
      throw error;
    }
  }

  // Xóa tất cả các bookings
  async deleteAllBookings() {
    try {
      return await Booking.deleteMany({});
    } catch (error) {
      throw error;
    }
  }
}

module.exports = BookingService;
