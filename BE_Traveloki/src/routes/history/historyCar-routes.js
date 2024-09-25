'use strict'

const express = require("express");
const route = express.Router();

const {
  GetLichSuDatXeOto,
  createHistory,
  DeleteLichSuDatXeOto,
} = require("../controller/HistoryCar.controller");

route.get("/GetLichSuDatXeOto", GetLichSuDatXeOto);
route.post("/createHistory", createHistory);
route.delete("/DeleteLichSuDatXeOto", DeleteLichSuDatXeOto);

module.exports = route;
