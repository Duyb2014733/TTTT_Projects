const Ticket = require("../models/Ticket.model");
const mongoose = require("mongoose");

class TicketService {
  // Tạo một vé xe mới
  async createTicket(ticketData) {
    try {
      return await Ticket.create(ticketData);
    } catch (error) {
      throw error;
    }
  }

  // Lấy thông tin của một vé xe dựa trên ID
  async getTicketById(ticketId) {
    try {
      if (!mongoose.Types.ObjectId.isValid(ticketId)) {
        throw new Error("Invalid ticket ID");
      }
      return await Ticket.findById(ticketId).populate("user_id");
    } catch (error) {
      throw error;
    }
  }

  // Lấy danh sách tất cả các vé xe
  async getAllTickets() {
    try {
      return await Ticket.find().populate("user_id");
    } catch (error) {
      throw error;
    }
  }

  // Cập nhật thông tin của một vé xe
  async updateTicket(ticketId, ticketData) {
    try {
      if (!mongoose.Types.ObjectId.isValid(ticketId)) {
        throw new Error("Invalid ticket ID");
      }
      return await Ticket.findByIdAndUpdate(ticketId, ticketData, {
        new: true,
      }).populate("user_id");
    } catch (error) {
      throw error;
    }
  }

  // Xóa một vé xe dựa trên ID
  async deleteTicket(ticketId) {
    try {
      if (!mongoose.Types.ObjectId.isValid(ticketId)) {
        throw new Error("Invalid ticket ID");
      }
      await Ticket.findByIdAndDelete(ticketId);
    } catch (error) {
      throw error;
    }
  }

  // Xóa tất cả các vé xe
  async deleteAllTickets() {
    try {
      await Ticket.deleteMany({});
    } catch (error) {
      throw error;
    }
  }
}

module.exports = TicketService;
