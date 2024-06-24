import createApiClient from "./api.service";

class TuyenDuongService {
  constructor(baseUrl = "/api/tuyenduong") {
    this.api = createApiClient(baseUrl);
  }

  async createTuyenDuong(tuyenDuongData, accessToken) {
    return (
      await this.api.post("/", tuyenDuongData, {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      })
    ).data;
  }

  async getTuyenDuongById(tuyenDuongId) {
    return (await this.api.get(`/${tuyenDuongId}`)).data;
  }

  async getAllTuyenDuongs() {
    return (await this.api.get("/")).data;
  }

  async updateTuyenDuong(tuyenDuongId, tuyenDuongData, accessToken) {
    return (
      await this.api.put(`/${tuyenDuongId}`, tuyenDuongData, {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      })
    ).data;
  }

  async deleteTuyenDuong(tuyenDuongId, accessToken) {
    return (
      await this.api.delete(`/${tuyenDuongId}`, {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      })
    ).data;
  }

  async deleteAllTuyenDuongs(accessToken) {
    return (
      await this.api.delete("/", {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      })
    ).data;
  }
}

export default new TuyenDuongService();
