// const {
//   LichSuDatTau,
//   LichSuDatXeBus,
//   LichSuDatXeOto,
// } = require('../models/schema');

const LichSuDatTau = require('../models/lichSuDatTau.model');
const changeSchedule = async (req, res) => {
  try {
    const { newDate } = req.body;
    let updated = false;
    let booking = null;

    booking =
      (await LichSuDatTau.findById(req.params.id)) ||
      (await LichSuDatXeBus.findById(req.params.id)) ||
      (await LichSuDatXeOto.findById(req.params.id));

    if (!booking) {
      return res.status(404).json({
        status: 'fail',
        message: 'Bạn chưa đặt vé!',
      });
    }

    const currentTime = moment();
    const departureTime = moment(booking.Date); /// Thời gian khởi hành
    const timeDifference = departureTime.diff(currentTime, 'minutes');

    if (timeDifference >= 180) {
      booking.Date = newDate;
      await booking.save();
      updated = true;
    } else if (timeDifference >= 30) {
      booking.Date = newDate;
      booking.fee = booking.price * 0.03; // Tính phí 3%
      await booking.save();
      updated = true;
    } else {
      return res
        .status(400)
        .json({ message: 'Quá thời gian để thay đổi lịch' });
    }

    // const tauBooking = await LichSuDatTau.findByIdAndUpdate(
    //   req.params.id,
    //   req.body,
    //   {
    //     new: true,
    //     runValidators: true,
    //   }
    // );
    // const busBooking = await LichSuDatXeBus.findByIdAndUpdate(
    //   req.params.id,
    //   req.body,
    //   {
    //     new: true,
    //     runValidators: true,
    //   }
    // );
    // const otoBooking = await LichSuDatOto.findByIdAndUpdate(
    //   req.params.id,
    //   req.body,
    //   {
    //     new: true,
    //     runValidators: true,
    //   }
    // );

    if (updated) {
      res
        .status(200)
        .json({ message: 'Lịch đưa đón đã được cập nhật thành công!' });
    } else {
      res.status(404).json({ message: 'Không tìm thấy lịch đặt!' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error', error: error.message });
  }
};

module.exports = changeSchedule;
