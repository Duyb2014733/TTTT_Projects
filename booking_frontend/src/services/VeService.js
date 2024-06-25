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
}

export default new VeService();
