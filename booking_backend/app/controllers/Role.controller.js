const RoleService = require("../services/Role.service");

exports.createRole = async (req, res, next) => {
  try {
    const roleData = req.body;
    const newRole = await RoleService.createRole(roleData);
    res.status(201).json(newRole);
  } catch (error) {
    next(error);
  }
};

exports.getAllRoles = async (req, res, next) => {
  try {
    const roles = await RoleService.getAllRoles();
    res.status(200).json(roles);
  } catch (error) {
    next(error);
  }
};

exports.getRoleById = async (req, res, next) => {
  try {
    const roleId = req.params.id;
    const role = await RoleService.getRoleById(roleId);
    res.status(200).json(role);
  } catch (error) {
    next(error);
  }
};

exports.updateRole = async (req, res, next) => {
  try {
    const roleId = req.params.id;
    const roleData = req.body;
    const updatedRole = await RoleService.updateRole(roleId, roleData);
    res.status(200).json(updatedRole);
  } catch (error) {
    next(error);
  }
};

exports.deleteRole = async (req, res, next) => {
  try {
    const roleId = req.params.id;
    await RoleService.deleteRole(roleId);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
