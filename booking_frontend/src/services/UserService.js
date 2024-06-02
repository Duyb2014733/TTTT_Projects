import createApiClient from "./api.service";

class UserService {
  constructor(baseUrl = "/api/user") {
    this.api = createApiClient(baseUrl);
  }

  async registerUser(userData) {
    return (await this.api.post("/", userData)).data;
  }

  async getUserById(userId) {
    return (await this.api.get(`/${userId}`)).data;
  }

  async getAllUsers() {
    return (await this.api.get("/")).data;
  }

  async updateUser(userId, userData) {
    return (await this.api.put(`/${userId}`, userData)).data;
  }

  async deleteUser(userId) {
    return (await this.api.delete(`/${userId}`)).data;
  }

  async deleteAllUsers() {
    return (await this.api.delete("/")).data;
  }
}

export default new UserService();
