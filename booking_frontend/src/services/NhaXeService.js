import createApiClient from "./api.service";

class NhaXeService {
  constructor(baseUrl = "/api/nhaxe") {
    this.api = createApiClient(baseUrl);
  }

  async createNhaXe(nhaXeData, accessToken) {
    return (
      await this.api.post("/", nhaXeData, {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      })
    ).data;
  }

  async getNhaXeById(nhaXeId) {
    return (await this.api.get(`/${nhaXeId}`)).data;
  }

  async getAllNhaXes() {
    return (await this.api.get("/")).data;
  }

  async updateNhaXe(nhaXeId, nhaXeData, accessToken) {
    return (
      await this.api.put(`/${nhaXeId}`, nhaXeData, {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      })
    ).data;
  }

  async deleteNhaXe(nhaXeId, accessToken) {
    return (
      await this.api.delete(`/${nhaXeId}`, {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      })
    ).data;
  }

  async deleteAllNhaXes(accessToken) {
    return (
      await this.api.delete("/", {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      })
    ).data;
  }
}

export default new NhaXeService();
