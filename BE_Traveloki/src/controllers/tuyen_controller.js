const { Tuyen } = require("../models/tuyen.model");
const { DanhSachSanBay } = require("../models/sanBay.model");
const { CounterTuyen } = require("../models/counter.model");

const { OK, CREATED, SuccessResponse  } = require("../middlewares/success.response")

const asyncHandler = require('../middlewares/asyncHandler.middeware')
const {getAllTuyenService, createTuyenService, deleteTuyenService} = require("../services/tuyen.service");

class RoadVehicleController {

}
// module.exports = new RoadVehicleController()

//. . .

const GetTuyen = async (req, res) => {
  const data = await getAllTuyenService();
  return res.status(200).json(data)
};

const CreateTuyen = async (req, res) => {
  const {items, DiemKhoiHanh, DiemKetThuc, ThoiGianKhoiHanh, ThoiGianKetThuc} = req.body;
  const data = await createTuyenService(items, DiemKhoiHanh, DiemKetThuc, ThoiGianKhoiHanh, ThoiGianKetThuc);
  return res.status(200).json(data)
};

const DeleteTuyen = async (req, res) => {
    const { id } = req.params;
    const data = await deleteTuyenService(id);
};

const TuyenIDTuyen = async (req, res) => {
  try {
    const { id } = req.params;
    await Tuyen.findById(id);
    res.status(200).json({ message: "Tuyen  successfully" });
  } catch (e) {
    res.status(500).json("not  tuyen");
  }
};

//DiemSanBay == MaSB
const TuyenDiemSanBay = async (req, res) => {
  const { diemSanBay } = req.query;

  if (!diemSanBay) {
    return res.status(400).json({ message: "diemSanBay is required" });
  }

  try {
    const tuyens = await Tuyen.find({
      DiemSanBay: { $regex: diemSanBay, $options: "i" },
    });

    if (!tuyens.length) {
      return res
        .status(404)
        .json({ message: "No tuyens found with the given DiemSanBay" });
    }

    res.status(200).json({ tuyens });
  } catch (error) {
    res.status(500).json({ message: "Error finding DiemSanBay", error });
  }
};

module.exports = {
  GetTuyen,
  TuyenIDTuyen,
  CreateTuyen,
  DeleteTuyen,
  TuyenDiemSanBay,
};
