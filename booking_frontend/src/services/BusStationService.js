import createApiClient from "./api.service";

class BusStationService {
  constructor(baseUrl = "/api/busstation") {
    this.api = createApiClient(baseUrl);
  }

  async createBusStation(BusStationData) {
    return (await this.api.post("/", BusStationData)).data;
  }

  async getBusStationById(BusStationId) {
    return (await this.api.get(`/${BusStationId}`)).data;
  }

  async getAllBusStations() {
    return (await this.api.get("/")).data;
  }

  async updateBusStation(BusStationId, BusStationData) {
    return (await this.api.put(`/${BusStationId}`, BusStationData)).data;
  }

  async deleteBusStation(BusStationId) {
    return (await this.api.delete(`/${BusStationId}`)).data;
  }

  async deleteAllBusStations() {
    return (await this.api.delete("/")).data;
  }
}

export default new BusStationService();
