const VeService = require("../services/Ve.service");
const ApiError = require("../api-error");

const veService = new VeService();

exports.createVe = async (req, res, next) => {
  try {
    const veData = req.body;
    const newVe = await veService.createVe(veData);
    res.status(201).json(newVe);
  } catch (error) {
    next(error);
  }
};

exports.getVeById = async (req, res, next) => {
  try {
    const veId = req.params.id;
    const Ve = await veService.getVeById(veId);
    if (!Ve) {
      return next(new ApiError(404, "Ve not found"));
    }
    res.status(200).json(Ve);
  } catch (error) {
    next(error);
  }
};

exports.getAllVes = async (req, res, next) => {
  try {
    const Ves = await veService.getAllVes();
    res.status(200).json(Ves);
  } catch (error) {
    next(error);
  }
};

exports.updateVe = async (req, res, next) => {
  try {
    const veId = req.params.id;
    const veData = req.body;
    const updatedVe = await veService.updateVe(veId, veData);
    if (!updatedVe) {
      return next(new ApiError(404, "Ve not found"));
    }
    res.status(200).json(updatedVe);
  } catch (error) {
    next(error);
  }
};

exports.deleteVe = async (req, res, next) => {
  try {
    const veId = req.params.id;
    const deletedVe = await veService.deleteVe(veId);
    if (!deletedVe) {
      return next(new ApiError(404, "Ve not found"));
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

exports.deleteAllVes = async (req, res, next) => {
  try {
    await veService.deleteAllVes();
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

exports.searchTickets = async (req, res) => {
  try {
    const { departure_city, arrival_city, departure_date } = req.query;

    // Kiểm tra các tham số truy vấn
    if (!departure_city || !arrival_city || !departure_date) {
      return res.status(400).json({ message: "Missing required parameters" });
    }

    // Kiểm tra định dạng ngày
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(departure_date)) {
      console.log("Invalid date format:", departure_date);
      return res.status(400).json({
        success: false,
        message: "Định dạng ngày không hợp lệ. Sử dụng định dạng YYYY-MM-DD",
      });
    }

    console.log("Tham số truy vấn:", req.query);

    const availableTickets = await veService.searchTickets(
      departure_city,
      arrival_city,
      departure_date
    );

    if (!availableTickets || availableTickets.length === 0) {
      return res.status(204).json({
        success: true,
        message: "Không tìm thấy vé nào phù hợp",
        data: [],
      });
    }

    res.json({
      success: true,
      message: "Tìm kiếm vé thành công",
      data: availableTickets,
    });
  } catch (error) {
    console.error("Lỗi khi tìm kiếm vé:", error);

    // Xử lý các loại lỗi cụ thể
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Dữ liệu không hợp lệ",
        error: error.message,
      });
    }

    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "ID không hợp lệ",
        error: error.message,
      });
    }

    res.status(500).json({
      success: false,
      message: "Lỗi server khi tìm kiếm vé",
      error: error.message,
    });
  }
};
