'use strict'

const express = require("express");
const route = express.Router();

const {
  GetLichSuDatXeOto,
  createHistory,
  DeleteLichSuDatXeOto,
  updateOneLichSuDatXeOto,
  updateManyLichSuDatXeOto
} = require("../../controllers/historyCar_controller");

route.get("/GetLichSuDatXeOto", GetLichSuDatXeOto);
route.post("/createHistory", createHistory);
route.delete("/DeleteLichSuDatXeOto", DeleteLichSuDatXeOto);
route.put("/update-one-his/:MaKH/:MaDX", updateOneLichSuDatXeOto)

module.exports = route;
