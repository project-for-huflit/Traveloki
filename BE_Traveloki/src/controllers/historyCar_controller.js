'use strict';

const LichSuDatXeOto =
  require('../models/lichSuDatXeOto.model.js').LichSuDatXeOto;

const {
  OK,
  CREATED,
  SuccessResponse,
} = require('../middlewares/success.response');

const asyncHandler = require('../middlewares/asyncHandler.middeware');

class HistoryCarController {}
// module.exports = new HistoryCarController()

const GetLichSuDatXeOto = async (req, res) => {
  try {
    const lichSuDatXeOto = await LichSuDatXeOto.find({});
    res.status(200).json({ lichSuDatXeOto });
  } catch (e) {
    res.status(500).json('not get lich su dat xe o to');
  }
};

const createHistory = async (req, res) => {
  try {
    const { MaKH, MaDX } = req.body;
    if (!MaKH || !MaDX) {
      return res.status(400).json({ message: 'MaKH and MaDX are required' });
    }
    const newHistory = new LichSuDatXeOto({ MaKH, MaDX });
    await newHistory.save();
    res.status(201).json({ newHistory });
  } catch (error) {
    res.status(500).json({ message: 'Error creating history', error });
  }
};

const DeleteLichSuDatXeOto = async (req, res) => {
  try {
    const { id } = req.params;
    await LichSuDatXeOto.findByIdAndDelete(id);
    res.status(200).json({ message: 'LichSuDatXeOto deleted successfully' });
  } catch (e) {
    res.status(500).json('not delete lich su dat xe o to');
  }
};

const updateOneLichSuDatXeOto = async (req, res) => {
  const { MaKH, MaDX } = req.params;
  const { Date } = req.body;
  try {
    const query = req.params.MaKH;
    const update = {
      $set: {
        Date: Date,
      },
    };
    const options = { new: true };

    const result = await LichSuDatXeOto.findOneAndUpdate(
      query,
      update,
      options
    );

    if (!result) {
      return res
        .status(404)
        .json({ message: 'Không tìm thấy lịch sử với MaKH này' });
    }

    res.status(200).json({
      message: 'LichSuDatXeOto updated one successfully!',
      data: result,
    });
  } catch (e) {
    res.status(500).json('not update one lich su dat xe o to');
  }
};

const updateManyLichSuDatXeOto = async (req, res) => {
  const { MaKH, MaDX } = req.params;
  const fieldsToUpdate = req.body;

  try {
    const result = await LichSuDatXeOto.findOneAndUpdate(
      { MaKH: MaKH, MaDX: MaDX },
      { $set: fieldsToUpdate },
      { new: true }
    );

    if (!result) {
      return res
        .status(404)
        .json({ message: 'Không tìm thấy lịch sử với MaKH này' });
    }

    res.status(200).json({
      message: 'LichSuDatXeOto updated many successfully!',
      data: result,
    });
  } catch (e) {
    res.status(500).json('not update many lich su dat xe o to');
  }
};

module.exports = {
  GetLichSuDatXeOto,
  createHistory,
  DeleteLichSuDatXeOto,
  updateOneLichSuDatXeOto,
  updateManyLichSuDatXeOto,
};
