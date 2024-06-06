const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  ticket_number: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  departure_datetime: {
    type: Date,
    required: true,
  },
});

const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = Ticket;
