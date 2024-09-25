const express = require("express");
const route = express.Router();
const GetKhachHang = require("../controllers/KhachHangController.js");

route.post("/GetKhachHang", GetKhachHang);

module.exports = route;
