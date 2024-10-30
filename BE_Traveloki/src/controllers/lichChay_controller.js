const {updateLichChayService, getAllLichChayService, createLichChayService, deleteLichChayService } = require('../services/lichChay.service');

const getAllLichChay = async (req, res) => {
  const data = await getAllLichChayService();
  return res.status(200).json(data);
}

const createLichChay = async (req, res) => {
  const { MaPT, MaTuyen, ngayKhoiHanh, gioKhoiHanh, gioKetThuc } = req.body;
  const data = await createLichChayService(MaPT, MaTuyen, ngayKhoiHanh, gioKhoiHanh, gioKetThuc);
  return res.status(200).json(data);
}

const deleteLichChay = async (req, res) => {
  const { id } = req.params;
  const data = await deleteLichChayService(id);
  return res.status(200).json(data);
}

const updateLichChay = async (req, res) => {
  const {id, MaPT, MaTuyen, ngayKhoiHanh, gioKhoiHanh, gioKetThuc } = req.body;
  const data = await updateLichChayService(id, MaPT, MaTuyen, ngayKhoiHanh, gioKhoiHanh, gioKetThuc);
  return res.status(200).json(data);
}


module.exports = {
  getAllLichChay, createLichChay, deleteLichChay, updateLichChay
}
