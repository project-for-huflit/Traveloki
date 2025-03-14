const { Tuyen } = require('../models/tuyen.model');
const { TramDung } = require('../models/tramDung.model');
const { CounterTramDung } = require('../models/counter.model');
const { TuyenTramDung } = require('../models/tuyenTramDung.model');
const {
  OK,
  CREATED,
  SuccessResponse,
} = require('../middlewares/success.response');
const axios = require('axios');
const asyncHandler = require('../middlewares/asyncHandler.middeware');
const {
  getAllTramDungService,
  createTramDungService,
  deleteTramDungService,
  updateTramDungService,
} = require('../services/tramDung.service');

class WayPointController {}
// module.exports = new WayPointController()

const updateTramDung = async (req, res) => {
  const { _id, ThanhPho, DiaChi, TenTramDung } = req.body;
  const data = await updateTramDungService(_id, ThanhPho, DiaChi, TenTramDung);
  return res.status(200).json(data);
};

const GetTramDungPartern = async (req, res) => {
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
    const tramDung = await TramDung.find(queryObj).populate('parternId').exec();
    res.status(200).json({
      status: 'success',
      results: tramDung.length,
      data: {
        tramDung,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

const GetTramDung = async (req, res) => {
  const data = await getAllTramDungService();
  return res.status(200).json(data);
};

const CreateTramDung = async (req, res) => {
  const { parternId, ThanhPho, DiaChi, TenTramDung } = req.body;
  const data = await createTramDungService(
    parternId,
    ThanhPho,
    DiaChi,
    TenTramDung,
  );
  return res.status(200).json(data);
};

const GetTramDungID = async (req, res) => {
  try {
    const id = req.params.id;
    console.log('Fetching TramDung with id:', id);
    const tramDung = await TramDung.findById(id);
    const tramDungWithTuyen = await TuyenTramDung.findOne({ MaTramDung: id });

    if (!tramDung) {
      return res.status(404).json({ message: 'Trạm dừng không tồn tại' });
    }

    if (!tramDungWithTuyen) {
      return res
        .status(404)
        .json({ message: 'Trạm dừng với tuyến không tồn tại' });
    }

    const cost = tramDungWithTuyen.SoKM;

    res.status(200).json({
      tramDung,
      cost,
    });
  } catch (e) {
    console.error('Server error:', e); // Log the error
    res.status(500).json({ message: 'Lỗi máy chủ' });
  }
};

const DeleteTramDung = async (req, res) => {
  const { id } = req.params;
  console.log('ID received:', id); // Kiểm tra ID nhận được
  const data = await deleteTramDungService(id);
  return res.status(200).json(data);
};

const getTramDungByDiaChi = async (req, res) => {
  const { diaChi } = req.query;

  if (!diaChi) {
    return res.status(400).json({ message: 'DiaChi is required' });
  }

  try {
    const tramDungs = await TramDung.find({
      DiaChi: { $regex: diaChi, $options: 'i' },
    });
    if (!tramDungs.length) {
      return res
        .status(404)
        .json({ message: 'No TramDung found with the given DiaChi' });
    }
    res.status(200).json({ tramDungs });
  } catch (error) {
    res.status(500).json({ message: 'Error finding TramDung', error });
  }
};

const getThanhPho = async (req, res) => {
  const data = await axios.get('https://provinces.open-api.vn/api/');
  return res.status(200).json(data.data);
};

module.exports = {
  GetTramDung,
  CreateTramDung,
  GetTramDungID,
  DeleteTramDung,
  getTramDungByDiaChi,
  getThanhPho,
  updateTramDung,
  GetTramDungPartern,
};
