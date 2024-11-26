const { Tuyen } = require('../models/tuyen.model');
const { DanhSachSanBay } = require('../models/sanBay.model');
const { CounterTuyen } = require('../models/counter.model');
const { TuyenTramDung } = require('../models/tuyenTramDung.model');

const {
  OK,
  CREATED,
  SuccessResponse,
} = require('../middlewares/success.response');

const asyncHandler = require('../middlewares/asyncHandler.middeware');
const {
  getAllTuyenService,
  createTuyenService,
  deleteTuyenService,
} = require('../services/tuyen.service');

class RoadVehicleController {}
// module.exports = new RoadVehicleController()

//. . .

const GetTuyen = async (req, res) => {
  const data = await getAllTuyenService();
  return res.status(200).json(data);
};

const GetTuyenPartern = async (req, res) => {
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
    const result = await TuyenTramDung.find()
      .populate('MaTuyen')
      .populate('MaTramDung');
    const tuyen = await Tuyen.find(queryObj).populate('parternId').exec();
    res.status(200).json({
      status: 'success',
      results: tuyen.length,
      data: {
        tuyen,
      },
      result,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

const CreateTuyen = async (req, res) => {
  const {
    parternId,
    TramList,
    DiemKhoiHanh,
    DiemKetThuc,
    ThoiGianKhoiHanh,
    ThoiGianKetThuc,
  } = req.body;
  const data = await createTuyenService(
    parternId,
    TramList,
    DiemKhoiHanh,
    DiemKetThuc,
    ThoiGianKhoiHanh,
    ThoiGianKetThuc,
  );
  return res.status(200).json(data);
};

const DeleteTuyen = async (req, res) => {
  const { id } = req.params;
  const data = await deleteTuyenService(id);
  return res.status(200).json(data);
};

const TuyenIDTuyen = async (req, res) => {
  try {
    const { id } = req.params;
    await Tuyen.findById(id);
    res.status(200).json({ message: 'Tuyen  successfully' });
  } catch (e) {
    res.status(500).json('not  tuyen');
  }
};

//DiemSanBay == MaSB
const TuyenDiemSanBay = async (req, res) => {
  const { diemSanBay } = req.query;

  if (!diemSanBay) {
    return res.status(400).json({ message: 'diemSanBay is required' });
  }

  try {
    const tuyens = await Tuyen.find({
      DiemSanBay: { $regex: diemSanBay, $options: 'i' },
    });

    if (!tuyens.length) {
      return res
        .status(404)
        .json({ message: 'No tuyens found with the given DiemSanBay' });
    }

    res.status(200).json({ tuyens });
  } catch (error) {
    res.status(500).json({ message: 'Error finding DiemSanBay', error });
  }
};

module.exports = {
  GetTuyenPartern,
  GetTuyen,
  TuyenIDTuyen,
  CreateTuyen,
  DeleteTuyen,
  TuyenDiemSanBay,
};
