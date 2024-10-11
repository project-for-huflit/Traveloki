console.log('controllers');
const {
  LichSuDatTau,
  LichSuDatXeBus,
  LichSuDatXeOto,
} = require('../models/schema');
const changeSchedule = async (req, res, next) => {
  console.log('vo dc controller');
  try {
    const { MaDX, newDate } = req.body;
    let updated = false;
    console.log('dattau');
    const tauBooking = await LichSuDatTau.findOne(MaDX);
    if (tauBooking) {
      tauBooking.Date = newDate;
      await tauBooking.save();
      updated = true;
    }
    console.log('datbus');

    const busBooking = await LichSuDatXeBus.findOne(MaDX);
    if (busBooking) {
      busBooking.Date = newDate;
      await busBooking.save();
      updated = true;
    }
    console.log('datoto');

    const otoBooking = await LichSuDatXeOto.findOne(MaDX);
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
