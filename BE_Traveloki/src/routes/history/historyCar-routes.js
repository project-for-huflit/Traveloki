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
route.patch("/update-one-his/:MaKH/:MaDX", updateOneLichSuDatXeOto)
route.patch("/update-many-his/:MaKH/:MaDX", updateManyLichSuDatXeOto)

module.exports = route;
