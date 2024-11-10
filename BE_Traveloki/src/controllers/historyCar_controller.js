const {LichSuDatXeOto} = require("../models/lichSuDatXeOto.model");

const { OK, CREATED, SuccessResponse  } = require("../middlewares/success.response")

const asyncHandler = require('../middlewares/asyncHandler.middeware')

class HistoryCarController {

}
// module.exports = new HistoryCarController()

const GetLichSuDatXeOto = async (req, res) => {
  try {
    const lichSuDatXeOto = await LichSuDatXeOto.find({});
    res.status(200).json({ lichSuDatXeOto });
  } catch (e) {
    res.status(500).json("not get lich su dat xe o to");
  }
};

const GetLichSuDatXeOtoV2 = async (req, res, next) => {
  try {
    const lichSuDatXeOto = await LichSuDatXeOto.find({})
    .populate({
      path: 'MaDX',
      // select: 'field1 field2' // Chỉ lấy các trường cần thiết
    })
    .exec()
    console.log("lichSuDatXeOto::", lichSuDatXeOto)
    res.status(200).json({ lichSuDatXeOto });
  } catch (e) {
    res.status(500).json("not get lich su dat xe o to");
  }
};

const createHistory = async (req, res) => {
  try {
    const { MaKH, MaDX } = req.body;
    if (!MaKH || !MaDX) {
      return res.status(400).json({ message: "MaKH and MaDX are required" });
    }
    const newHistory = new LichSuDatXeOto({ MaKH, MaDX });
    await newHistory.save();
    res.status(201).json({ newHistory });
  } catch (error) {
    res.status(500).json({ message: "Error creating history", error });
  }
};

const DeleteLichSuDatXeOto = async (req, res) => {
  try {
    const { id } = req.params;
    await LichSuDatXeOto.findByIdAndDelete(id);
    res.status(200).json({ message: "LichSuDatXeOto deleted successfully" });
  } catch (e) {
    res.status(500).json("not delete lich su dat xe o to");
  }
};

const updateLichSuDatXeOto = async (req, res) => {
  const { id } = req.params;
  const { Date } = req.body;
  try {
    const update = {
      $set: {
        Date: Date
      }
    },
    option = {
      new: true
    };

    if (!Date) return res.status(404).json({ message: 'Not found date in history car!' });

    const result = await LichSuDatXeOto.findByIdAndUpdate( id, update, option );

    if (!result) {
      return res.status(404).json({ message: 'Không tìm thấy lịch sử với MaKH này' });
    }

    res.status(200).json({
      message: "LichSuDatXeOto updated one successfully!",
      data: result
    });
  } catch (e) {
    res.status(500).json("not update one lich su dat xe o to");
  }
};

module.exports = {
  GetLichSuDatXeOto,
  createHistory,
  DeleteLichSuDatXeOto,
  updateLichSuDatXeOto
};
