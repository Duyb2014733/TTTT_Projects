const BookingService = require("../services/Booking.service");
const ApiError = require("../api-error");

const bookingService = new BookingService();

exports.createBooking = async (req, res, next) => {
  try {
    const bookingData = req.body;
    const newBooking = await bookingService.createBooking(bookingData);
    res.status(201).json(newBooking);
  } catch (error) {
    next(new ApiError(500, error.message));
  }
};

exports.getBookingById = async (req, res, next) => {
  try {
    const bookingId = req.params.id;
    const booking = await bookingService.getBookingById(bookingId);
    if (!booking) {
      return next(new ApiError(404, "Booking not found"));
    }
    res.status(200).json(booking);
  } catch (error) {
    next(new ApiError(500, error.message));
  }
};

exports.getAllBookings = async (req, res, next) => {
  try {
    const bookings = await bookingService.getAllBookings();
    res.status(200).json(bookings);
  } catch (error) {
    next(new ApiError(500, error.message));
  }
};

exports.updateBooking = async (req, res, next) => {
  try {
    const bookingId = req.params.id;
    const bookingData = req.body;
    const updatedBooking = await bookingService.updateBooking(
      bookingId,
      bookingData
    );
    if (!updatedBooking) {
      return next(new ApiError(404, "Booking not found"));
    }
    res.status(200).json(updatedBooking);
  } catch (error) {
    next(new ApiError(500, error.message));
  }
};

exports.deleteBooking = async (req, res, next) => {
  try {
    const bookingId = req.params.id;
    const deletedBooking = await bookingService.deleteBooking(bookingId);
    if (!deletedBooking) {
      return next(new ApiError(404, "Booking not found"));
    }
    res.status(204).send();
  } catch (error) {
    next(new ApiError(500, error.message));
  }
};

exports.deleteAllBookings = async (req, res, next) => {
  try {
    await bookingService.deleteAllBookings();
    res.status(204).send();
  } catch (error) {
    next(new ApiError(500, error.message));
  }
};
