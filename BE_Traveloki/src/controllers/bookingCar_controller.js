const { LichSuDatXeOto } = require("../models/lichSuDatXeOto.model");

const { DatXeOto } = require("../models/datXeOto.model");
const { TramDung } = require("../models/tramDung.model");
const { ChiTietXeOto } = require("../models/detailsCar.model");
const CounterDatXeOto = require("../models/counter.model").CounterDatXe;

// const asyncHandler = require('../middlewares/asyncHandler.middeware')

// const { OK, CREATED, SuccessResponse  } = require("../middlewares/success.response")

class BookingCarController {
  getDatXeOto = async ( req, res, next ) => {

  }

  BookingCar = async ( req, res, next ) => {

  }

  schedularChange = async ( req, res, next ) => {

  }

  cancelBooking = async ( req, res, next ) => {

  }

  findBookingCarID = async ( req, res, next ) => {

  }

  findBookingCarMaDX = async ( req, res, next ) => {

  }
}
// module.exports = new BookingCarController()

const GetDatXeOto = async (req, res) => {
  try {
    const datXeOto = await DatXeOto.find({});
    res.status(200).json({ datXeOto });
  } catch (e) {
    res.status(500).json("Can not get booking car!");
  }
};

const BookingCar = async (req, res) => {
  try {
    const {
      MaDetailCar, Sdt, MaTram, DiemSanBay,
      DiemDon_Tra, NgayGioDat, ThanhTien, SoKm, Description,
    } = req.body;

    const tramDung = await TramDung.findById(MaTram);
    const chiTietXe = await ChiTietXeOto.findById(MaDetailCar);
    if (!chiTietXe) { return res.status(404).json({ message: "Vehicle details do not exist!!" }); }
    if (!tramDung) { return res.status(404).json({ message: "Waypoint do not exist" }); }

    const CounterDatXe = await CounterDatXeOto.findOneAndUpdate(
      { _id: "datXeCounter" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    const MaDX = `DX${CounterDatXe.seq}`;

    const CreateDatXeOto = new DatXeOto({
      MaDX, MaDetailCar, Sdt, MaTram, DiemSanBay, DiemDon_Tra,
      NgayGioDat, SoKm, ThanhTien, Trangthai: false, Description,
    });

    const result = await CreateDatXeOto.save();

    res.status(200).json(result); // Đảm bảo result chứa trường Sdt
  } catch (e) {
    console.error("Can not create booking car:", e);
    res.status(500).json({ error: "Can not create booking car!!" });
  }
};

const SchedularChange = async (req, res) => {
  try {
    const { id } = req.params;
    const { NgayGioDat } = req.body;

    const newNgayGioDat = new Date(NgayGioDat);
    if (newNgayGioDat < new Date()) {
      return res.status(400).json({
        message: "Ngày giờ đặt phải lớn hơn hoặc bằng ngày hiện tại.",
      });
    }

    await DatXeOto.findByIdAndUpdate(id, {
      $set: { NgayGioDat: newNgayGioDat },
    });
    res.status(200).json({ message: "Đã cập nhật Ngày giờ đặt thành công." });
  } catch (e) {
    console.error("Can not update DatXeOto:", e);
    res.status(500).json({ error: "Can not update schedule booking car!" });
  }
};

const CancelBooking = async (req, res) => {
  try {
    const { MaDX } = req.params;
    if (!MaDX) {
      return res.status(400).json("Missing information");
    }

    await DatXeOto.deleteOne({ MaDX });
    await LichSuDatXeOto.deleteOne({ MaDX });

    res.status(200).json({ message: "Cancel booking successfully!." });
  } catch (e) {
    console.error("Can not cancel DatXeOto:", e);
    res.status(500).json({ error: "Can not cancel booking" });
  }
};

const FindBookingCarID = async (req, res) => {
  try {
    const { id } = req.params;
    const datXeOto = await DatXeOto.findOne(id);

    if (!datXeOto) {
      return res.status(404).json({ message: "DatXeOto not found" });
    }

    return res.status(200).json(datXeOto);
  } catch (e) {
    console.error("Error fetching DatXeOto by ID:", e);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const FindBookingCarMaDX = async (req, res) => {
  const { MaDX } = req.query;

  if (!MaDX) {
    return res.status(400).json({ message: "MaDX is required" });
  }

  try {
    const datXes = await DatXeOto.find({
      MaDX: { $regex: MaDX, $options: "i" },
    });

    if (!datXes.length) {
      return res
        .status(404)
        .json({ message: "No booking found with the given MaDX" });
    }

    res.status(200).json({ datXes });
  } catch (error) {
    console.error("Error finding cars by MaDX:", error);
    res.status(500).json({ message: "Error finding cars", error });
  }
};

module.exports = {
  GetDatXeOto,
  BookingCar,
  SchedularChange,
  CancelBooking,
  FindBookingCarID,
  FindBookingCarMaDX,
};
