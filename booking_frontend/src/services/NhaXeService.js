import createApiClient from "./api.service";

class NhaXeService {
  constructor(baseUrl = "/api/nhaxe") {
    this.api = createApiClient(baseUrl);
  }

  async createNhaXe(nhaXeData) {
    return (await this.api.post("/", nhaXeData)).data;
  }

  async getNhaXeById(nhaXeId) {
    return (await this.api.get(`/${nhaXeId}`)).data;
  }

  async getAllNhaXes() {
    return (await this.api.get("/")).data;
  }

  async updateNhaXe(nhaXeId, nhaXeData) {
    return (await this.api.put(`/${nhaXeId}`, nhaXeData)).data;
  }

  async deleteNhaXe(nhaXeId) {
    return (await this.api.delete(`/${nhaXeId}`)).data;
  }

  async deleteAllNhaXes() {
    return (await this.api.delete("/")).data;
  }
}

export default new NhaXeService();
