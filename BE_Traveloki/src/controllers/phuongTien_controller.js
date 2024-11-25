const { PhuongTien } = require('../models/phuongTien.model');
const { Tuyen } = require('../models/tuyen.model.js');
const CounterPhuongTien = require('../models/counter.model').CounterPhuongTien;

const {
  OK,
  CREATED,
  SuccessResponse,
} = require('../middlewares/success.response');

const asyncHandler = require('../middlewares/asyncHandler.middeware')
const {deletePhuongTienService, updatePhuongTienService, getAllPhuongTienService, createPhuongTienService, getPhuongTienByLichChayService} = require("../services/phuongTien.service");

class VehicleController {}
// module.exports = new VehicleController()

const GetPhuongTienAdmin = async (req, res) => {
  try {
    const phuongTien = await getAllPhuongTienService();
    res.status(200).json(phuongTien);
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: 'Server Error',
    });
  }
};

const GetPhuongTien = async (req, res) => {
  try {
    const parternId = req.params.id;
    console.log(parternId);
    if (!parternId) {
      return res.status(401).json({
        status: 'fail',
        message: 'Bạn phải đăng nhập để xem thông tin booking',
      });
    }

    const queryObj = { ...req.query, partern: parternId };
    const phuongTien = await PhuongTien.find(queryObj).populate('partern');

    res.status(200).json({
      status: 'success',
      results: phuongTien.length,
      data: {
        phuongTien,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

const GetPhuongTienID = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('Fetching phuong tien with id: ', id);

    const phuongTien = await PhuongTien.findById(id);

    if (!phuongTien) {
      return res.status(404).json({ error: 'Phuong tien not found' });
    }

    res.status(200).json({ phuongTien });
  } catch (e) {
    console.error('Error fetching phuong tien: ', e);
    res.status(500).json({ error: 'Failed to get phuong tien' });
  }
};

const CreatePhuongTien = async (req, res) => {
  const { partern, TenPhuongTien, LoaiPT, MaSoXe, SoGheToiDa, Image, MaSB } =
    req.body;
  const data = await createPhuongTienService(
    partern,
    TenPhuongTien,
    LoaiPT,
    MaSoXe,
    SoGheToiDa,
    Image,
    MaSB,
  );
  return res.status(200).json(data);
};

const DeletePhuongTien = async (req, res) => {
  const { id } = req.params;
  const data = await deletePhuongTienService(id);
  return res.status(200).json(data);
};

const SearchFindPhuongTien = async (req, res) => {
  let type;
  switch (req.params.type) {
    case 'true':
      type = true;
      break;
    case 'false':
      type = false;
      break;
    default:
      return res.status(400).json({ message: 'Invalid type parameter' });
  }

  try {
    const phuongTien = await PhuongTien.find({ MaLoai: type });
    if (phuongTien.length === 0) {
      return res.status(404).json({ message: 'No vehicles found' });
    }
    res.json({ buses: phuongTien });
  } catch (err) {
    console.error('Database query error:', err);
    res.status(500).json({ message: 'Error querying database' });
  }
};

const GetPhuongTienByLichChay = async (req, res) => {
  const { MaTuyen } = req.body;
  const data = await getPhuongTienByLichChayService(MaTuyen);
  return res.status(200).json(data);
};

const updatePhuongTien = async (req, res) => {
  const { _id, LoaiPT, MaSoXe, TenPhuongTien, SoGheToiDa, Image, MaSB } =
    req.body;
  const data = await updatePhuongTienService(
    _id,
    LoaiPT,
    MaSoXe,
    TenPhuongTien,
    SoGheToiDa,
    Image,
    MaSB,
  );
  return res.status(200).json(data);
};

module.exports = {
  GetPhuongTien,
  GetPhuongTienAdmin,
  CreatePhuongTien,
  DeletePhuongTien,
  SearchFindPhuongTien,
  GetPhuongTienID,
  GetPhuongTienByLichChay,
  updatePhuongTien,
};
