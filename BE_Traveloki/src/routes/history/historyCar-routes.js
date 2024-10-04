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
route.patch("/update-one-his/:MaKH", updateOneLichSuDatXeOto)
route.patch("/update-many-his/:MaKH", updateManyLichSuDatXeOto)

module.exports = route;
