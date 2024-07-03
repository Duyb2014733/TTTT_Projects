import createApiClient from "./api.service";

class ViTriGheService {
  constructor(baseUrl = "/api/vitrighe") {
    this.api = createApiClient(baseUrl);
  }

  async getViTriGheByXeId(xeId) {
    return (await this.api.get(`/xe/${xeId}`)).data;
  }

  async createViTriGhe(ViTriGheData, accessToken) {
    return (
      await this.api.post("/", ViTriGheData, {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      })
    ).data;
  }

  async getViTriGheById(ViTriGheId) {
    return (await this.api.get(`/${ViTriGheId}`)).data;
  }

  async getAllViTriGhe() {
    return (await this.api.get("/")).data;
  }

  async updateViTriGhe(ViTriGheId, ViTriGheData, accessToken) {
    return (
      await this.api.put(`/${ViTriGheId}`, ViTriGheData, {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      })
    ).data;
  }

  async deleteViTriGhe(ViTriGheId, accessToken) {
    return (
      await this.api.delete(`/${ViTriGheId}`, {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      })
    ).data;
  }

  async updateSeatsStatus(seatIds, newStatus, accessToken) {
    return (
      await this.api.put(
        `/updateSeatsStatus`,
        { seatIds, newStatus },
        {
          headers: {
            token: `Bearer ${accessToken}`,
          },
        }
      )
    ).data;
  }
}

export default new ViTriGheService();
