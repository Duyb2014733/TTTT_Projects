import createApiClient from "./api.service";

class VeService {
  constructor(baseUrl = "/api/ve") {
    this.api = createApiClient(baseUrl);
  }

  async createVe(veData) {
    return (await this.api.post("/", veData)).data;
  }

  async getVeById(veId) {
    return (await this.api.get(`/${veId}`)).data;
  }

  async getAllVes() {
    return (await this.api.get("/")).data;
  }

  async updateVe(veId, veData) {
    return (await this.api.put(`/${veId}`, veData)).data;
  }

  async deleteVe(veId) {
    return (await this.api.delete(`/${veId}`)).data;
  }

  async deleteAllVes() {
    return (await this.api.delete("/")).data;
  }
}

export default new VeService();
