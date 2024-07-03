import createApiClient from "./api.service";

class ThanhToanService {
  constructor(baseUrl = "/api/thanhtoan") {
    this.api = createApiClient(baseUrl);
  }

  async createThanhToan(thanhToanData, accessToken) {
    return (
      await this.api.post("/", thanhToanData, {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      })
    ).data;
  }

  async getThanhToanById(thanhToanId) {
    return (await this.api.get(`/${thanhToanId}`)).data;
  }

  async getAllThanhToans() {
    return (await this.api.get("/")).data;
  }

  async updateThanhToan(thanhToanId, thanhToanData, accessToken) {
    return (
      await this.api.put(`/${thanhToanId}`, thanhToanData, {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      })
    ).data;
  }

  async deleteThanhToan(thanhToanId, accessToken) {
    return (
      await this.api.delete(`/${thanhToanId}`, {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      })
    ).data;
  }

  async deleteAllThanhToans(accessToken) {
    return (
      await this.api.delete("/", {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      })
    ).data;
  }

  async getThanhToansByCustomerId(id) {
    return (await this.api.get(`/khachhang/${id}`)).data;
  }
}

export default new ThanhToanService();
