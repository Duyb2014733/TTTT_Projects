import createApiClient from "./api.service";

class KhachHangService {
  constructor(baseUrl = "/api/khachhang") {
    this.api = createApiClient(baseUrl);
  }

  async registerKhachHang(khachHangData) {
    return (await this.api.post("/", khachHangData)).data;
  }
  async loginKhachHang(khachHangData) {
    return (await this.api.post("/login", khachHangData)).data;
  }

  async getKhachHangById(khachHangId) {
    return (await this.api.get(`/${khachHangId}`)).data;
  }

  async getAllKhachHangs() {
    return (await this.api.get("/")).data;
  }

  async updateKhachHang(khachHangId, khachHangData) {
    return (await this.api.put(`/${khachHangId}`, khachHangData)).data;
  }

  async deleteKhachHang(khachHangId) {
    return (await this.api.delete(`/${khachHangId}`)).data;
  }

  async deleteAllKhachHangs() {
    return (await this.api.delete("/")).data;
  }
}

export default new KhachHangService();
