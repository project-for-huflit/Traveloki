const express = require("express");
const route = express.Router();

const {
  GetLichSuDatXeOto,
  createHistory,
  DeleteLichSuDatXeOto,
  updateLichSuDatXeOto
} = require("../../controllers/historyCar_controller");

route.get("/GetLichSuDatXeOto", GetLichSuDatXeOto);
route.post("/createHistory", createHistory);
route.delete("/DeleteLichSuDatXeOto", DeleteLichSuDatXeOto);
route.patch("/update-history-car/:id", updateLichSuDatXeOto)

module.exports = route;
