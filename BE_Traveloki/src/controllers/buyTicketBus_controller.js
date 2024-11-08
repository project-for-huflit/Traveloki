const { PhieuDatXeBus } = require('../models/phieuDatXeBus.model');
const CounterDatBuyt = require('../models/counter.model').CounterDatBuyt;
const { LichSuDatXeBus } = require('../models/lichSuDatXeBus.model');

const {
  OK,
  CREATED,
  SuccessResponse,
} = require('../middlewares/success.response');

const { BookingBusService } = require('../services/booking.service');

const asyncHandler = require('../middlewares/asyncHandler.middeware');

class BookingBusController {}

// module.exports = new BookingBusController()

const GetBuyTicketBus = async (req, res) => {
  try {
    const buyTicketBus = await PhieuDatXeBus.find();
    res.status(200).json({ buyTicketBus });
  } catch (e) {
    res.status(500).json('not get buy ticket bus');
  }
};

const BuyTicketBus = async (req, res) => {
  try {
    const { MaPT, SLVe, DiemDon, DiemTra, NgayGioKhoiHanh, ThanhTien } =
      req.body;

    // console.log("NgayGioKhoiHanh::", NgayGioKhoiHanh)
    console.log('body nhan vao::', {
      MaPT,
      SLVe,
      DiemDon,
      DiemTra,
      NgayGioKhoiHanh,
      ThanhTien,
    });
    const parsedDate = new Date(NgayGioKhoiHanh);

    // if (isNaN(parsedDate.getTime())) {
    //   console.log('Invalid date format for NgayGioKhoiHanh');
    //   NgayGioKhoiHanh = parsedDate.toISOString(); // Định dạng ISO
    // }

    if (
      !MaPT ||
      !SLVe ||
      !DiemDon ||
      !DiemTra ||
      !NgayGioKhoiHanh ||
      !ThanhTien
    ) {
      return res.status(400).json('Missing information');
    }
    if (SLVe <= 0) {
      return res.status(400).json({ message: 'Số lượng vé phải lớn hơn 0.' });
    }

    const CounterdatBuyt = await CounterDatBuyt.findOneAndUpdate(
      { _id: 'datbuytCounter' },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    const MaVeBus = `DB${CounterdatBuyt.seq}`;

    if (!isNaN(parsedDate.getTime())) {
      const buyTicketBus = new PhieuDatXeBus({
        MaVeBus,
        MaPT,
        SLVe,
        DiemDon,
        DiemTra,
        NgayGioKhoiHanh: parsedDate,
        ThanhTien,
        TrangThai: false,
      });
      const result = await buyTicketBus.save();
      res.status(200).json(result);
    } else {
      console.error('Ngày giờ không hợp lệ');
    }
  } catch (e) {
    console.error(e);
    res.status(500).json('Can not create buy ticket bus');
  }
};

const PaymentPointerWallet = async (req, res, next) => {
  new SuccessResponse({
    message: 'success!',
    metadata: await BookingBusService.PaymentPointerWallet(req.body),
  }).send(res);
};

const CancelPaymentPointerWallet = async (req, res, next) => {
  new SuccessResponse({
    message: 'success!',
    metadata: await BookingBusService.CancelPaymentPointerWallet(req.params),
  }).send(res);
};

const FindBuyTicketBusMaDX = async (req, res) => {
  try {
    const { MaVeBus } = req.params;
    const buyTicketBus = await PhieuDatXeBus.findOne({ MaVeBus });

    if (!buyTicketBus) {
      return res.status(404).json({ message: 'Bus ticket not found' });
    }

    res.status(200).json({ buyTicketBus });
  } catch (e) {
    console.error('Error fetching bus ticket by MaVeBus:', e);
    res.status(500).json({ message: 'Internal server error' });
  }
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

    await PhieuDatXeBus.findByIdAndUpdate(id, {
      $set: { NgayGioDat: newNgayGioDat },
    });
    res.status(200).json({ message: 'Đã cập nhật Ngày giờ đặt thành công.' });
  } catch (e) {
    console.error('Can not update PhieuDatXeBus:', e);
    res.status(500).json({ error: 'Can not update schedule booking bus!' });
  }
};

const CancelBookingBus = async (req, res) => {
  const { MaVeBus } = req.params;
  if (!MaVeBus) {
    return res.status(400).json({ message: 'Missing information'});
  }
  try {
   const bookingBus = await PhieuDatXeBus.findOne({MaVeBus});
   const ngayGioKhoiHanh = new Date(bookingBus.NgayGioKhoiHanh);
   const nowDate = new Date();
   const timeDifference = (ngayGioKhoiHanh - nowDate) / (1000 * 60);

    if (timeDifference >= 60) {
      // Hủy miễn phí trước 1 giờ
      bookingBus.isActive = false;
      await bookingBus.save();
      return res.status(200).json({ message: 'Đặt chỗ đã được hủy miễn phí' });
    } else if (timeDifference >= 30) {
      // Hủy trong khoảng 30 đến 60 phút trước giờ khởi hành, mất phí 3%
      const cancellationFee = bookingBus.price * 0.03;
      bookingBus.isActive = false;
      await bookingBus.save();
      return res.status(200).json({
        message: 'Đặt chỗ đã được hủy, phí hủy là 3%',
        cancellationFee: cancellationFee,
      });
    } else {
      // Không cho phép hủy trong vòng 30 phút trước giờ khởi hành
      return res.status(400).json({ message: 'Không thể hủy trong vòng 30 phút trước giờ khởi hành' });
    }
  } catch (e) {
    console.error(e);
    res
      .status(500)
      .json({ message: 'Không thể hủy PhieuDatXeBus và lịch sử đặt xe' });
  }
};

module.exports = {
  GetBuyTicketBus,
  BuyTicketBus,
  SchedularChange,
  CancelBookingBus,
  FindBuyTicketBusMaDX,
  PaymentPointerWallet,
  CancelPaymentPointerWallet,
};
