const { LichSuDatXeOto } = require('../models/lichSuDatXeOto.model');

const { DatXeOto } = require('../models/datXeOto.model');
const { TramDung } = require('../models/tramDung.model');
const { ChiTietXeOto } = require('../models/detailsCar.model');
const CounterDatXeOto = require('../models/counter.model').CounterDatXe;
const {
  OK,
  CREATED,
  SuccessResponse,
} = require('../middlewares/success.response');
const BookingSubject = require("./observe/bookingCarSubject");

const { BookingCarService } = require('../services/booking.service')
const { PaymentService } = require('../services/payment.service')

// const { OK, CREATED, SuccessResponse  } = require("../middlewares/success.response")

class BookingCarController {
  getDatXeOto = async (_req, _res, _next) => {};

  BookingCar = async (_req, _res, _next) => {};

  schedularChange = async (_req, _res, _next) => {};

  cancelBooking = async (_req, _res, _next) => {};

  findBookingCarID = async (_req, _res, _next) => {};

  findBookingCarMaDX = async (_req, _res, _next) => {};
}
// module.exports = new BookingCarController()

const GetDatXeOto = async (_req, res) => {
  try {
    const datXeOto = await DatXeOto.find({});
    res.status(200).json({ datXeOto });
  } catch (e) {
    res.status(500).json('Can not get booking car!');
  }
};

const BookingCar = async (req, res) => {
  try {
    const {
      MaDetailCar, Sdt, MaTram, DiemSanBay,
      DiemDon_Tra, NgayGioDat, ThanhTien, SoKm, Description, userId
    } = req.body;

    console.log("userId::", userId)

    const tramDung = await TramDung.findById(MaTram);
    const chiTietXe = await ChiTietXeOto.findById(MaDetailCar);
    if (!chiTietXe) {
      return res
        .status(404)
        .json({ message: 'Vehicle details do not exist!!' });
    }
    if (!tramDung) {
      return res.status(404).json({ message: 'Waypoint do not exist' });
    }

    const CounterDatXe = await CounterDatXeOto.findOneAndUpdate(
      { _id: 'datXeCounter' },
      { $inc: { seq: 1 } },
      { new: true, upsert: true },
    );

    const MaDX = `DX${CounterDatXe.seq}`;

    const CreateDatXeOto = new DatXeOto({
      MaDX, MaDetailCar, Sdt, MaTram, DiemSanBay, DiemDon_Tra,
      NgayGioDat, SoKm, ThanhTien, Trangthai: false, Description, userId
    });

    const result = await CreateDatXeOto.save();

    const newHistory = new LichSuDatXeOto({ MaKH: userId, MaDX, DiemDon: DiemSanBay, DiemTra: DiemDon_Tra });
    const resultHistoryCar = await newHistory.save();
    console.log("resultHistoryCar::", resultHistoryCar)

    BookingSubject.notifyObservers({
      message: `🚖 Đơn đặt xe ${MaDX} đã tạo thành công!`,
      userId
    });

    // console.log("Check id::", result)
    res.status(200).json(result); // Đảm bảo result chứa trường Sdt
  } catch (e) {
    console.error('Can not create booking car:', e);
    res.status(500).json({ error: 'Can not create booking car!!' });
  }
};

const PaymentPointerWallet = async (req, res, _next) => {
  new SuccessResponse({
    message: 'success!',
    metadata: await BookingCarService.PaymentPointerWallet(req.body),
  }).send(res);
};

// #region Bridge - Quan
const PaymentPointerWalletBridge = async (req, res, _next) => {
  new SuccessResponse({
    message: 'success!',
    metadata: await BookingCarService.PaymentPointerWalletBridge(req.body),
  }).send(res);
};

const RefundPaymentPointerWallet = async (req, res, _next) => {
  // console.log("req.params.id::", req.params.id)
  new SuccessResponse({
    message: 'success!',
    metadata: await BookingCarService.RefundPaymentPointerWallet(req.body),
  }).send(res);
};

const CancelPaymentPointerWallet = async (req, res, _next) => {
  // console.log("req.body::", req.body)
  new SuccessResponse({
    message: 'success!',
    metadata: await BookingCarService.CancelPaymentPointerWallet(req.body),
  }).send(res);
};

// #region Bridge - Quan
const CancelPaymentPointerWalletBridge = async (req, res, _next) => {
  new SuccessResponse({
    message: 'success!',
    metadata: await BookingCarService.CancelPaymentPointerWalletBridge(req.body),
  }).send(res);
};

const OneClickPaymentPointerWallet = async (req, res, _next) => {
  // console.log("req.params.id::", req.params.id)
  new SuccessResponse({
    message: 'success!',
    metadata: await BookingCarService.OneClickPaymentPointerWallet(req.body),
  }).send(res);
};

const SchedularChange = async (req, res) => {
  try {
    const { id } = req.params;
    const { NgayGioDat } = req.body;

    const newNgayGioDat = new Date(NgayGioDat);
    if (newNgayGioDat < new Date()) {
      return res.status(400).json({
        message: 'Ngày giờ đặt phải lớn hơn hoặc bằng ngày hiện tại.',
      });
    }

    await DatXeOto.findByIdAndUpdate(id, {
      $set: { NgayGioDat: newNgayGioDat },
    });
    res.status(200).json({ message: 'Đã cập nhật Ngày giờ đặt thành công.' });
  } catch (e) {
    console.error('Can not update DatXeOto:', e);
    res.status(500).json({ error: 'Can not update schedule booking car!' });
  }
};

const CancelBooking = async (req, res) => {
  try {
    const { MaDX } = req.params;
    if (!MaDX) {
      return res.status(400).json('Missing information');
    }

    await DatXeOto.deleteOne({ MaDX });
    await LichSuDatXeOto.deleteOne({ MaDX });

    res.status(200).json({ message: 'Cancel booking successfully!.' });
  } catch (e) {
    console.error('Can not cancel DatXeOto:', e);
    res.status(500).json({ error: 'Can not cancel booking' });
  }
};

const FindBookingCarID = async (req, res) => {
  try {
    const { id } = req.params;
    const datXeOto = await DatXeOto.findOne(id);

    if (!datXeOto) {
      return res.status(404).json({ message: 'DatXeOto not found' });
    }

    return res.status(200).json(datXeOto);
  } catch (e) {
    console.error('Error fetching DatXeOto by ID:', e);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const FindBookingCarMaDX = async (req, res) => {
  const { MaDX } = req.query;

  if (!MaDX) {
    return res.status(400).json({ message: 'MaDX is required' });
  }

  try {
    const datXes = await DatXeOto.find({
      MaDX: { $regex: MaDX, $options: 'i' },
    });

    if (!datXes.length) {
      return res
        .status(404)
        .json({ message: 'No booking found with the given MaDX' });
    }

    res.status(200).json({ datXes });
  } catch (error) {
    console.error('Error finding cars by MaDX:', error);
    res.status(500).json({ message: 'Error finding cars', error });
  }
};

module.exports = {
  GetDatXeOto,
  BookingCar,
  SchedularChange,
  CancelBooking,
  FindBookingCarID,
  FindBookingCarMaDX,
  PaymentPointerWallet,
  CancelPaymentPointerWallet,
  RefundPaymentPointerWallet,
  OneClickPaymentPointerWallet,

  // Bridge
  PaymentPointerWalletBridge,
  CancelPaymentPointerWalletBridge
};
