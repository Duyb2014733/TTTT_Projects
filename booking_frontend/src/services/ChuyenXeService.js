import createApiClient from "./api.service";

class ChuyenXeService {
  constructor(baseUrl = "/api/chuyenxe") {
    this.api = createApiClient(baseUrl);
  }

  async createChuyenXe(chuyenXeData, accessToken) {
    return (
      await this.api.post("/", chuyenXeData, {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      })
    ).data;
  }

  async getChuyenXeById(chuyenXeId) {
    return (await this.api.get(`/${chuyenXeId}`)).data;
  }

  async getAllChuyenXes() {
    return (await this.api.get("/")).data;
  }

  async updateChuyenXe(chuyenXeId, chuyenXeData, accessToken) {
    return (
      await this.api.put(`/${chuyenXeId}`, chuyenXeData, {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      })
    ).data;
  }

  async deleteChuyenXe(chuyenXeId, accessToken) {
    return (
      await this.api.delete(`/${chuyenXeId}`, {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      })
    ).data;
  }

  async deleteAllChuyenXes(accessToken) {
    return (
      await this.api.delete("/", {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      })
    ).data;
  }
}

export default new ChuyenXeService();
