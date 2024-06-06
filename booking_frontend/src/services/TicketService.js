import createApiClient from "./api.service";

class TicketService {
  constructor(baseUrl = "/api/ticket") {
    this.api = createApiClient(baseUrl);
  }

  async createTicket(ticketData) {
    return (await this.api.post("/", ticketData)).data;
  }

  async getTicketById(ticketId) {
    return (await this.api.get(`/${ticketId}`)).data;
  }

  async getAllTickets() {
    return (await this.api.get("/")).data;
  }

  async updateTicket(ticketId, ticketData) {
    return (await this.api.put(`/${ticketId}`, ticketData)).data;
  }

  async deleteTicket(ticketId) {
    return (await this.api.delete(`/${ticketId}`)).data;
  }

  async deleteAllTickets() {
    return (await this.api.delete("/")).data;
  }
}

export default new TicketService();
