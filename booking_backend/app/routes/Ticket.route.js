const express = require("express");
const router = express.Router();
const ticketController = require("../controllers/Ticket.controller");

router
  .route("/")
  .post(ticketController.createTicket)
  .get(ticketController.getAllTickets)
  .delete(ticketController.deleteAllTickets);

router
  .route("/:id")
  .get(ticketController.getTicketById)
  .put(ticketController.updateTicket)
  .delete(ticketController.deleteTicket);

module.exports = router;
