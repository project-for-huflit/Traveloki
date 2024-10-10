console.log('controllers');
const {
  LichSuDatTau,
  LichSuDatXeBus,
  LichSuDatOto,
} = require('../models/schema');
const changeSchedule = async (req, res, next) => {
  console.log('vo dc controller');
  try {
    const { MaDX, newDate } = req.body;
    let updated = false;
    console.log('dattau');
    const tauBooking = await LichSuDatTau.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    console.log('datbus');

    const busBooking = await LichSuDatXeBus.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    console.log('datoto');
    const otoBooking = await LichSuDatOto.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    console.log(otoBooking);
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
