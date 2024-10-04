const lichSuDatTau = require('../models/lichSuDatTau.model');
const lichSuDatXeBus = require('../models/lichSuDatXeBus.model');
const lichSuDatOto = require('../models/lichSuDatXeOto.model');

router.put('/update-schedule', async (req, res) => {
  try {
    const { bookingId, newDepartureDate, newReturnDate } = req.body;

    let updated = false;

    // Kiểm tra xem có trong lịch sử đặt tàu không
    const tauBooking = await lichSuDatTau.findById(bookingId);
    if (tauBooking) {
      tauBooking.departureDate = newDepartureDate;
      tauBooking.returnDate = newReturnDate;
      await tauBooking.save();
      updated = true;
    }

    // Kiểm tra xem có trong lịch sử đặt xe buýt không
    const busBooking = await lichSuDatXeBus.findById(bookingId);
    if (busBooking) {
      busBooking.departureDate = newDepartureDate;
      busBooking.returnDate = newReturnDate;
      await busBooking.save();
      updated = true;
    }

    // Kiểm tra xem có trong lịch sử đặt ô tô không
    const otoBooking = await lichSuDatOto.findById(bookingId);
    if (otoBooking) {
      otoBooking.departureDate = newDepartureDate;
      otoBooking.returnDate = newReturnDate;
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
});

module.exports = router;
