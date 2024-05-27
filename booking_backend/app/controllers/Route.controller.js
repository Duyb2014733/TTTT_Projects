const RouteService = require("../services/Route.service");
const ApiError = require("../utils/ApiError");

const routeService = new RouteService();

// Tạo một tuyến đường mới
exports.createRoute = async (req, res, next) => {
  try {
    const routeData = req.body;
    const newRoute = await routeService.createRoute(routeData);
    res.status(201).json(newRoute);
  } catch (error) {
    next(error);
  }
};

// Lấy thông tin của một tuyến đường dựa trên ID
exports.getRouteById = async (req, res, next) => {
  try {
    const routeId = req.params.id;
    const route = await routeService.getRouteById(routeId);
    if (!route) {
      throw new ApiError(404, "Route not found");
    }
    res.status(200).json(route);
  } catch (error) {
    next(error);
  }
};

// Lấy danh sách tất cả các tuyến đường
exports.getAllRoutes = async (req, res, next) => {
  try {
    const routes = await routeService.getAllRoutes();
    res.status(200).json(routes);
  } catch (error) {
    next(error);
  }
};

// Cập nhật thông tin của một tuyến đường
exports.updateRoute = async (req, res, next) => {
  try {
    const routeId = req.params.id;
    const routeData = req.body;
    const updatedRoute = await routeService.updateRoute(routeId, routeData);
    if (!updatedRoute) {
      throw new ApiError(404, "Route not found");
    }
    res.status(200).json(updatedRoute);
  } catch (error) {
    next(error);
  }
};

// Xóa một tuyến đường dựa trên ID
exports.deleteRoute = async (req, res, next) => {
  try {
    const routeId = req.params.id;
    const deletedRoute = await routeService.deleteRoute(routeId);
    if (!deletedRoute) {
      throw new ApiError(404, "Route not found");
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

// Xóa tất cả các tuyến đường
exports.deleteAllRoutes = async (req, res, next) => {
  try {
    await routeService.deleteAllRoutes();
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
