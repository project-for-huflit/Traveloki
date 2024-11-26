const {
  updateLichChayService,
  getAllLichChayService,
  createLichChayService,
  deleteLichChayService,
} = require('../services/lichChay.service');
const { LichChay } = require('../models/lichChay.model');

const getAllLichChay = async (req, res) => {
  const data = await getAllLichChayService();
  return res.status(200).json(data);
};

const GetLichChayPartern = async (req, res) => {
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
    const lichChay = await LichChay.find(queryObj).populate('parternId').exec();
    res.status(200).json({
      status: 'success',
      results: lichChay.length,
      data: {
        lichChay,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

const createLichChay = async (req, res) => {
  const {
    parternId,
    MaPT,
    MaTuyen,
    ngayKhoiHanh,
    gioKhoiHanh,
    gioKetThuc,
    SLVe,
  } = req.body;
  const data = await createLichChayService(
    parternId,
    MaPT,
    MaTuyen,
    ngayKhoiHanh,
    gioKhoiHanh,
    gioKetThuc,
    SLVe,
  );
  return res.status(200).json(data);
};

const deleteLichChay = async (req, res) => {
  const { id } = req.params;
  const data = await deleteLichChayService(id);
  return res.status(200).json(data);
};

const updateLichChay = async (req, res) => {
  const { id, MaPT, MaTuyen, ngayKhoiHanh, gioKhoiHanh, gioKetThuc } = req.body;
  const data = await updateLichChayService(
    id,
    MaPT,
    MaTuyen,
    ngayKhoiHanh,
    gioKhoiHanh,
    gioKetThuc,
  );
  return res.status(200).json(data);
};

module.exports = {
  GetLichChayPartern,
  getAllLichChay,
  createLichChay,
  deleteLichChay,
  updateLichChay,
};
