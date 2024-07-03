const ViTriGheService = require("../services/ViTriGhe.service");
const XeService = require("../services/Xe.service");
const mongoose = require("mongoose");
const ViTriGhe = require("../models/ViTriGhe.model");
const Xe = require("../models/Xe.model");

const viTriGheService = new ViTriGheService();
const xeService = new XeService();

// Lấy danh sách tất cả vị trí ghế
exports.getAllViTriGhe = async (req, res) => {
  try {
    const vitrighe = await viTriGheService.getAllViTriGhe();
    res.json(vitrighe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Lấy vị trí ghế theo ID
exports.getViTriGheById = async (req, res) => {
  const id = req.params.id;

  try {
    const viTriGhe = await viTriGheService.getViTriGheById(id);
    if (!viTriGhe) {
      return res.status(404).json({ message: "Không tìm thấy vị trí ghế" });
    }
    res.json(viTriGhe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getViTriGheByXeId = async (req, res) => {
  const { xeId } = req.params;

  try {
    const vitrigheList = await viTriGheService.getViTriGheByXeId(xeId);
    res.status(200).json(vitrigheList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Tạo mới vị trí ghế
exports.createViTriGhe = async (req, res) => {
  const viTriGheData = req.body;

  try {
    const newViTriGhe = await viTriGheService.createViTriGhe(viTriGheData);
    await xeService.updateViTriGheCount(newViTriGhe.vitrighe_vehicle);
    res.status(201).json(newViTriGhe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cập nhật vị trí ghế
exports.updateViTriGhe = async (req, res) => {
  const id = req.params.id;
  const viTriGheData = req.body;

  try {
    const updatedViTriGhe = await viTriGheService.updateViTriGhe(
      id,
      viTriGheData
    );
    if (!updatedViTriGhe) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy vị trí ghế để cập nhật" });
    }
    res.json(updatedViTriGhe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Xóa vị trí ghế
exports.deleteViTriGhe = async (req, res) => {
  const id = req.params.id;

  try {
    const deletedViTriGhe = await viTriGheService.deleteViTriGhe(id);
    await xeService.updateViTriGheCount(deletedViTriGhe.vitrighe_vehicle);
    if (!deletedViTriGhe) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy vị trí ghế để xóa" });
    }
    res.json({ message: "Đã xóa vị trí ghế thành công" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateSeatsStatus = async (req, res) => {
  const { seatIds, newStatus } = req.body;
  try {
    const updatedSeats = await viTriGheService.updateSeatsStatus(
      seatIds,
      newStatus
    );
    res.status(200).json(updatedSeats);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating seat status", error: error.message });
  }
};
