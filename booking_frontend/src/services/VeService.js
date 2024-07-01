import createApiClient from "./api.service";

class VeService {
  constructor(baseUrl = "/api/ve") {
    this.api = createApiClient(baseUrl);
  }

  async createVe(veData, accessToken) {
    return (
      await this.api.post("/", veData, {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      })
    ).data;
  }

  async getVeById(veId) {
    return (await this.api.get(`/${veId}`)).data;
  }

  async getAllVes() {
    return (await this.api.get("/")).data;
  }

  async updateVe(veId, veData, accessToken) {
    return (
      await this.api.put(`/${veId}`, veData, {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      })
    ).data;
  }

  async deleteVe(veId, accessToken) {
    return (
      await this.api.delete(`/${veId}`, {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      })
    ).data;
  }

  async deleteAllVes(accessToken) {
    return (
      await this.api.delete("/", {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      })
    ).data;
  }

  async searchTickets(departure_city, arrival_city, departure_date) {
    try {
      const response = await this.api.get("/search-tickets", {
        params: {
          departure_city,
          arrival_city,
          departure_date,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error searching tickets:", error);
      throw new Error("Error searching tickets");
    }
  }
}

export default new VeService();
