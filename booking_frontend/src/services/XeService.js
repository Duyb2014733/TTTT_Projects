import createApiClient from "./api.service";

class XeService {
  constructor(baseUrl = "/api/xe") {
    this.api = createApiClient(baseUrl);
  }

  async createXe(xeData, accessToken) {
    return (
      await this.api.post("/", xeData, {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      })
    ).data;
  }

  async getXeById(xeId) {
    return (await this.api.get(`/${xeId}`)).data;
  }

  async getAllXes() {
    return (await this.api.get("/")).data;
  }

  async updateXe(xeId, xeData, accessToken) {
    return (
      await this.api.put(`/${xeId}`, xeData, {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      })
    ).data;
  }

  async deleteXe(xeId, accessToken) {
    return (
      await this.api.delete(`/${xeId}`, {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      })
    ).data;
  }

  async deleteAllXes(accessToken) {
    return (
      await this.api.delete("/", {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      })
    ).data;
  }
}

export default new XeService();
