console.log('controllers');
const { LichSuDatTau } = require('../models/lichSuDatTau.model.js');
// console.log('controllers2');
// const { LichSuDatXeBus } = require('../models/lichSuDatXeBus.model.js');
// console.log('controllers3');
// const { LichSuDatOto } = require('../models/lichSuDatXeOto.model.js');

const changeSchedule = async (req, res) => {
  try {
    const { MaDX, newDate } = req.body;
    let updated = false;

    // const tauBooking = await lichSuDatTau.findOne(MaDX);
    // if (tauBooking) {

    // }

    // const busBooking = await lichSuDatXeBus.findOneAndUpdate(MaDX);
    // if (busBooking) {
    //   busBooking.Date = newDate;
    //   await busBooking.save();
    //   updated = true;
    // }

    // const otoBooking = await lichSuDatOto.findOneAndUpdate(MaDX);
    // if (otoBooking) {
    //   otoBooking.Date = newDate;
    //   await otoBooking.save();
    //   updated = true;
    // }

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
