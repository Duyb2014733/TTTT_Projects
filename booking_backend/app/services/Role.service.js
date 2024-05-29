const Role = require("../models/Role.model");

class RoleService {
  async createRole(roleData) {
    try {
      return await Role.create(roleData);
    } catch (error) {
      throw error;
    }
  }

  async getAllRoles() {
    try {
      return await Role.find();
    } catch (error) {
      throw error;
    }
  }

  async getRoleById(roleId) {
    try {
      return await Role.findById(roleId);
    } catch (error) {
      throw error;
    }
  }

  async updateRole(roleId, roleData) {
    try {
      return await Role.findByIdAndUpdate(roleId, roleData, { new: true });
    } catch (error) {
      throw error;
    }
  }

  async deleteRole(roleId) {
    try {
      await Role.findByIdAndDelete(roleId);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new RoleService();
