import createApiClient from "./api.service";

class ThanhToanService {
  constructor(baseUrl = "/api/thanhtoan") {
    this.api = createApiClient(baseUrl);
  }

  async createThanhToan(thanhToanData) {
    return (await this.api.post("/", thanhToanData)).data;
  }

  async getThanhToanById(thanhToanId) {
    return (await this.api.get(`/${thanhToanId}`)).data;
  }

  async getAllThanhToans() {
    return (await this.api.get("/")).data;
  }

  async updateThanhToan(thanhToanId, thanhToanData) {
    return (await this.api.put(`/${thanhToanId}`, thanhToanData)).data;
  }

  async deleteThanhToan(thanhToanId) {
    return (await this.api.delete(`/${thanhToanId}`)).data;
  }

  async deleteAllThanhToans() {
    return (await this.api.delete("/")).data;
  }
}

export default new ThanhToanService();
