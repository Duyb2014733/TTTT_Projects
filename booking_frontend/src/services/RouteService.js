import createApiClient from "./api.service";

class RouteService {
  constructor(baseUrl = "/api/route") {
    this.api = createApiClient(baseUrl);
  }

  async createRoute(RouteData) {
    return (await this.api.post("/", RouteData)).data;
  }

  async getRouteById(RouteId) {
    return (await this.api.get(`/${RouteId}`)).data;
  }

  async getAllRoutes() {
    return (await this.api.get("/")).data;
  }

  async updateRoute(RouteId, RouteData) {
    return (await this.api.put(`/${RouteId}`, RouteData)).data;
  }

  async deleteRoute(RouteId) {
    return (await this.api.delete(`/${RouteId}`)).data;
  }

  async deleteAllRoutes() {
    return (await this.api.delete("/")).data;
  }
}

export default new RouteService();
