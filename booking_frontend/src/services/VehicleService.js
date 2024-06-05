import createApiClient from "./api.service";

class VehicleService {
  constructor(baseUrl = "/api/vehicle") {
    this.api = createApiClient(baseUrl);
  }

  async createVehicle(vehicleData) {
    return (await this.api.post("/", vehicleData)).data;
  }

  async getVehicleById(vehicleId) {
    return (await this.api.get(`/${vehicleId}`)).data;
  }

  async getAllVehicles() {
    return (await this.api.get("/")).data;
  }

  async updateVehicle(vehicleId, vehicleData) {
    return (await this.api.put(`/${vehicleId}`, vehicleData)).data;
  }

  async deleteVehicle(vehicleId) {
    return (await this.api.delete(`/${vehicleId}`)).data;
  }

  async deleteAllVehicles() {
    return (await this.api.delete("/")).data;
  }
}

export default new VehicleService();
