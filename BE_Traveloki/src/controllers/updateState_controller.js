const { DatXeOto } = require("../models/datXeOto.model");
const { PhieuDatXeBus } = require("../models/phieuDatXeBus.model");
const { PhieuDatTau } = require("../models/phieuDatTau.model");

const { LichSuDatXeOto } = require("../models/lichSuDatXeOto.model");
const { LichSuDatXeBus } = require("../models/lichSuDatXeBus.model");
const { LichSuDatTau } = require("../models/lichSuDatTau.model");

const { OK, CREATED, SuccessResponse  } = require("../middlewares/success.response")

const asyncHandler = require('../middlewares/asyncHandler.middeware')

class StateBookingController {

}

// module.exports = new StateBookingController()

const UpdateState = async (req, res) => {
  try {
    const { id } = req.params;

    // Cập nhật trạng thái đặt xe ô tô
    let updatedBooking = await DatXeOto.findByIdAndUpdate(
      id,
      { $set: { Trangthai: true } },
      { new: true }
    );

    if (updatedBooking) {
      await LichSuDatXeOto.create({
        MaKH: "KHthanh",
        MaDX: updatedBooking.MaDX,
        Date: updatedBooking.NgayGioDat,
      });
      return res
        .status(200)
        .json({ message: "Đã cập nhật trạng thái đặt xe ô tô thành công." });
    }

    // Cập nhật trạng thái đặt xe bus
    updatedBooking = await PhieuDatXeBus.findByIdAndUpdate(
      id,
      { $set: { TrangThai: true } },
      { new: true }
    );

    if (updatedBooking) {
      await LichSuDatXeBus.create({
        MaDX: updatedBooking.MaVeBus,
        MaKH: "KHthanh",
        Date: updatedBooking.NgayGioKhoiHanh,
      });
      return res
        .status(200)
        .json({ message: "Đã cập nhật trạng thái đặt xe bus thành công." });
    }

    // Cập nhật trạng thái đặt tàu
    updatedBooking = await PhieuDatTau.findByIdAndUpdate(
      id,
      { $set: { TrangThai: true } },
      { new: true }
    );

    if (updatedBooking) {
      await LichSuDatTau.create({
        MaKH: "KHthanh",
        MaDX: updatedBooking.MaVeTau,
        Date: updatedBooking.NgayGioKhoiHanh,
      });
      return res
        .status(200)
        .json({ message: "Đã cập nhật trạng thái đặt tàu thành công." });
    }

    return res.status(404).json({ message: "Booking không tồn tại" });
  } catch (e) {
    console.error("Lỗi khi cập nhật trạng thái:", e);
    res.status(500).json({ error: "Không thể cập nhật trạng thái đặt xe." });
  }
};

module.exports = {
  UpdateState,
};
