import createApiClient from "./api.service";

class KhachHangService {
  constructor(baseUrl = "/api/khachhang") {
    this.api = createApiClient(baseUrl);
  }

  async registerKhachHang(khachHangData) {
    return (await this.api.post("/", khachHangData)).data;
  }

  async loginKhachHang(khachHangData, accessToken) {
    return (
      await this.api.post("/login", khachHangData, {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      })
    ).data;
  }

  async logoutKhachHang(khachHangData, accessToken) {
    return (
      await this.api.post("/logout", khachHangData, {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      })
    ).data;
  }

  async getKhachHangById(khachHangId, accessToken) {
    return (
      await this.api.get(`/${khachHangId}`, {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      })
    ).data;
  }

  async getAllKhachHangs(accessToken) {
    return (
      await this.api.get("/", {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      })
    ).data;
  }

  async updateKhachHang(khachHangId, khachHangData, accessToken) {
    return (
      await this.api.put(`/${khachHangId}`, khachHangData, {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      })
    ).data;
  }

  async deleteKhachHang(khachHangId, accessToken) {
    return (
      await this.api.delete(`/${khachHangId}`, {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      })
    ).data;
  }

  async deleteAllKhachHangs(accessToken) {
    return (
      await this.api.delete("/", {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      })
    ).data;
  }
}

export default new KhachHangService();
