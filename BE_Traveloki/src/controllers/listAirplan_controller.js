const { SanBay } = require('../models/sanBay.model');
const Counter = require('../models/counter.model').CounterLSB;
const {
  getAllSanBayService,
  createSanBayService,
  deleteSanBayService,
} = require('../services/sanBay.service');

const {
  OK,
  CREATED,
  SuccessResponse,
} = require('../middlewares/success.response');

const asyncHandler = require('../middlewares/asyncHandler.middeware');

class AirportController {}
// module.exports = new AirportController()

const GetDanhSachSanBay = async (req, res) => {
  const data = await getAllSanBayService();
  return res.status(200).json(data);
};

const GetDanhSachSanBayPartern = async (req, res) => {
  try {
    const parternId = req.params.id;
    if (!parternId) {
      return res.status(401).json({
        status: 'fail',
        message: 'Bạn phải đăng nhập để xem thông tin',
      });
    }
    const queryObj = { ...req.query, parternId };
    console.log(queryObj);
    const sanBay = await SanBay.find(queryObj).populate('parternId').exec();
    res.status(200).json({
      status: 'success',
      results: sanBay.length,
      data: {
        sanBay,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

const CreateDanhSachSanBay = async (req, res) => {
  const { parternId, TenSanBay, ThanhPho } = req.body;
  const data = await createSanBayService(parternId, TenSanBay, ThanhPho);
  return res.status(200).json(data);
};

const DeleteDanhSachSanBay = async (req, res) => {
  const { id } = req.params;
  const data = await deleteSanBayService(id);
  return res.status(200).json(data);
};

const GetSanBayID = async (req, res) => {
  try {
    const { id } = req.params;
    const danhSachSanBay = await SanBay.findById(id);

    if (!danhSachSanBay) {
      return res.status(404).json({ message: 'Sân bay không tồn tại' });
    }

    res.status(200).json(danhSachSanBay);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Error retrieving sân bay' });
  }
};

const getSanBaybyTenSanBay = async (req, res) => {
  const { TenSanBay } = req.query;

  if (!TenSanBay) {
    return res.status(400).json({ message: 'sanbay is required' });
  }

  try {
    const sanbays = await SanBay.find({
      TenSanBay: { $regex: TenSanBay, $options: 'i' },
    });

    if (!sanbays.length) {
      return res
        .status(404)
        .json({ message: 'No sanbays found with the given TenSanBay' });
    }

    res.status(200).json({ sanbays });
  } catch (error) {
    console.error('Error finding SanBay:', error);
    res.status(500).json({ message: 'Error finding SanBay', error });
  }
};

module.exports = {
  GetDanhSachSanBay,
  CreateDanhSachSanBay,
  DeleteDanhSachSanBay,
  GetSanBayID,
  getSanBaybyTenSanBay,
  GetDanhSachSanBayPartern,
};
