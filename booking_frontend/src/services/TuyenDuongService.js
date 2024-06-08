import createApiClient from "./api.service";

class TuyenDuongService {
  constructor(baseUrl = "/api/tuyenduong") {
    this.api = createApiClient(baseUrl);
  }

  async createTuyenDuong(tuyenDuongData) {
    return (await this.api.post("/", tuyenDuongData)).data;
  }

  async getTuyenDuongById(tuyenDuongId) {
    return (await this.api.get(`/${tuyenDuongId}`)).data;
  }

  async getAllTuyenDuongs() {
    return (await this.api.get("/")).data;
  }

  async updateTuyenDuong(tuyenDuongId, tuyenDuongData) {
    return (await this.api.put(`/${tuyenDuongId}`, tuyenDuongData)).data;
  }

  async deleteTuyenDuong(tuyenDuongId) {
    return (await this.api.delete(`/${tuyenDuongId}`)).data;
  }

  async deleteAllTuyenDuongs() {
    return (await this.api.delete("/")).data;
  }
}

export default new TuyenDuongService();
