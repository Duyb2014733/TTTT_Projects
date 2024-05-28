const express = require("express");
const cors = require("cors");
const VehicleRouter = require("./app/routes/Vehicle.route");
const UserRouter = require("./app/routes/User.route");
const TicketRouter = require("./app/routes/Ticket.route");
const RouteRouter = require("./app/routes/Route.route");
const RideRouter = require("./app/routes/Ride.route");
const ApiError = require("./app/api-error");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Chào mừng bạn đến để kết nối ứng dụng đặt vé." });
});

app.use("/api/vehicle/", VehicleRouter);
app.use("/api/user/", UserRouter);
app.use("/api/ticket/", TicketRouter);
app.use("/api/route/", RouteRouter);
app.use("/api/ride/", RideRouter);

app.use((req, res, next) => {
  return next(new ApiError(404, "Không tìm thấy tài nguyên"));
});

app.use((err, req, res, next) => {
  return res.status(err.statusCode || 500).json({
    message: err.message || "Lỗi máy chủ nội bộ",
  });
});

module.exports = app;
