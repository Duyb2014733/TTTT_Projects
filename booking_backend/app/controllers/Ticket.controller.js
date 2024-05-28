const TicketService = require("../services/Ticket.service");
const ApiError = require("../api-error");

const ticketService = new TicketService();

exports.createTicket = async (req, res, next) => {
  try {
    const ticketData = req.body;
    const newTicket = await ticketService.createTicket(ticketData);
    res.status(201).json(newTicket);
  } catch (error) {
    next(error);
  }
};

exports.getTicketById = async (req, res, next) => {
  try {
    const ticketId = req.params.id;
    const ticket = await ticketService.getTicketById(ticketId);
    if (!ticket) {
      return next(new ApiError(404, "Ticket not found"));
    }
    res.status(200).json(ticket);
  } catch (error) {
    next(error);
  }
};

exports.getAllTickets = async (req, res, next) => {
  try {
    const tickets = await ticketService.getAllTickets();
    res.status(200).json(tickets);
  } catch (error) {
    next(error);
  }
};

exports.updateTicket = async (req, res, next) => {
  try {
    const ticketId = req.params.id;
    const ticketData = req.body;
    const updatedTicket = await ticketService.updateTicket(
      ticketId,
      ticketData
    );
    if (!updatedTicket) {
      return next(new ApiError(404, "Ticket not found"));
    }
    res.status(200).json(updatedTicket);
  } catch (error) {
    next(error);
  }
};

exports.deleteTicket = async (req, res, next) => {
  try {
    const ticketId = req.params.id;
    const deletedTicket = await ticketService.deleteTicket(ticketId);
    if (!deletedTicket) {
      return next(new ApiError(404, "Ticket not found"));
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

exports.deleteAllTickets = async (req, res, next) => {
  try {
    await ticketService.deleteAllTickets();
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
