const lichSuDatTau = require('../models/lichSuDatTau.model');
const lichSuDatXeBus = require('../models/lichSuDatXeBus.model');
const lichSuDatOto = require('../models/lichSuDatXeOto.model');

const changeSchedule = async (req, res) => {
  try {
    const { MaDX, newDate } = req.body;
    let updated = false;

    const tauBooking = await lichSuDatTau.findById(MaDX);
    if (tauBooking) {
      tauBooking.Date = newDate;
      await tauBooking.save();
      updated = true;
    }

    const busBooking = await lichSuDatXeBus.findById(MaDX);
    if (busBooking) {
      busBooking.Date = newDate;
      await busBooking.save();
      updated = true;
    }

    const otoBooking = await lichSuDatOto.findById(MaDX);
    if (otoBooking) {
      otoBooking.Date = newDate;
      await otoBooking.save();
      updated = true;
    }

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
