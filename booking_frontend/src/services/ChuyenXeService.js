import createApiClient from "./api.service";

class ChuyenXeService {
  constructor(baseUrl = "/api/chuyenxe") {
    this.api = createApiClient(baseUrl);
  }

  async createChuyenXe(chuyenXeData) {
    return (await this.api.post("/", chuyenXeData)).data;
  }

  async getChuyenXeById(chuyenXeId) {
    return (await this.api.get(`/${chuyenXeId}`)).data;
  }

  async getAllChuyenXes() {
    return (await this.api.get("/")).data;
  }

  async updateChuyenXe(chuyenXeId, chuyenXeData) {
    return (await this.api.put(`/${chuyenXeId}`, chuyenXeData)).data;
  }

  async deleteChuyenXe(chuyenXeId) {
    return (await this.api.delete(`/${chuyenXeId}`)).data;
  }

  async deleteAllChuyenXes() {
    return (await this.api.delete("/")).data;
  }
}

export default new ChuyenXeService();
