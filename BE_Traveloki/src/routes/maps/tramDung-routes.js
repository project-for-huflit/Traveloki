'use strict'

const express = require("express");
const route = express.Router();
const {
  getTramDungByDiaChi,
  GetTramDung,
  CreateTramDung,
  GetTramDungID,
  DeleteTramDung,
  getThanhPho
} = require("../../controllers/tramDung_controller");

route.get("/GetTramDung", GetTramDung);
route.post("/CreateTramDung", CreateTramDung);
route.get("/GetTramDungID/:id", GetTramDungID);
route.delete("/DeleteTramDung/:id", DeleteTramDung);
route.get("/TramDungByDiaChi", getTramDungByDiaChi);
route.get("/ThanhPho", getThanhPho)

module.exports = route;
