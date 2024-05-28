const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/Booking.controller");

router
  .route("/")
  .post(bookingController.createBooking)
  .get(bookingController.getAllBookings)
  .delete(bookingController.deleteAllBookings);

router
  .route("/:id")
  .get(bookingController.getBookingById)
  .put(bookingController.updateBooking)
  .delete(bookingController.deleteBooking);

module.exports = router;
