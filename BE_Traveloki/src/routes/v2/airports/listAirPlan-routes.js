const express = require("express");
const route = express.Router();
const {
  GetDanhSachSanBay,
  DeleteDanhSachSanBay,
  CreateDanhSachSanBay,
  GetSanBayID,
  getSanBaybyTenSanBay,
} = require("../../controllers/listAirplan_controller");

route.get("/airports", GetDanhSachSanBay);
route.post("/airports", CreateDanhSachSanBay);

route.get("/airports/:id", GetSanBayID);
route.get("/airports/name", getSanBaybyTenSanBay);
route.delete("/airports/:id", DeleteDanhSachSanBay);
module.exports = route;
