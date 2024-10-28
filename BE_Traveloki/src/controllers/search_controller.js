const express = require("express");
const session = require("express-session");
const { SanBay } = require("../models/sanBay.model");
const { TramDung } = require("../models/tramDung.model");
const { Tuyen } = require("../models/tuyen.model");
const { TuyenTramDung } = require("../models/tuyenTramDung.model");

const { OK, CREATED, SuccessResponse  } = require("../middlewares/success.response")

const asyncHandler = require('../middlewares/asyncHandler.middeware')

const app = express();

class SearchController {

}

// module.exports = new SearchController()


const SuggestsAirpost = async (req, res) => {
  try {
    const { query } = req.query;
    const suggestions = await SanBay.find({
      TenSanBay: { $regex: query, $options: "i" },
    }).limit(10);

    // const tramdungtuongung = await TramDung.find({
    //   MaTuyen: { $in: suggestions.map((sanBay) => sanBay.MaSB) },
    // });

    res.json({
      sanBays: suggestions.map((sanBay) => sanBay.TenSanBay),
      // tramDungs: tramdungtuongung.map((tramDung) => tramDung.DiaChi),
    });
  } catch (err) {
    res.status(500).json({
      message: "Có lỗi xảy ra khi lấy gợi ý sân bay.",
      error: err.message,
    });
  }
};

const SuggestsTramDung = async (req, res) => {
  try {
    const { query } = req.query;
    const tramDungSuggestions = await TramDung.find({
      DiaChi: { $regex: query, $options: "i" },
    }).limit(10);

    // const maTuyens = tramDungSuggestions.map((tramDung) => tramDung.MaTuyen);
    //
    // const sanBayTuongUng = await SanBay.find({
    //   MaSB: { $in: maTuyens },
    // });

    res.json({
      tramDungs: tramDungSuggestions.map((tramDung) => tramDung.DiaChi),
      // sanBays: sanBayTuongUng.map((sanBay) => sanBay.TenSanBay),
    });
  } catch (err) {
    res.status(500).json({
      message: "Có lỗi xảy ra khi lấy gợi ý trạm dừng.",
      error: err.message,
    });
  }
};

const checkTuyenTramDung = async (req, res) => {
  try {
    const { diemKhoiHanh, diemKetThuc } = req.body;
    const maTuyenTuongUng = await Tuyen.find({
      DiemKhoiHanh: { $in: diemKhoiHanh },
    })

    const tramDungTuongUng = await TramDung.find({
      DiaChi: { $in: diemKetThuc },
    })

    const result = await TuyenTramDung.find({
      MaTuyen: { $in: maTuyenTuongUng.map((tuyen) => tuyen._id) },
      MaTramDung: { $in: tramDungTuongUng.map((tram) => tram._id) },
    })
    if (!result.length) {
      return res.status(404).json({ message: "Không tìm thấy tuyến nào phù hợp giữa điểm khởi hành và điểm kết thúc" });
    }

    res.status(200).json({ success: true, data: result });
  }catch(error){
    res.status(500).json({
      message: "Có lỗi xảy ra khi lấy gợi ý sân bay.",
      error: err.message,
    });
  }
}

module.exports = {
  SuggestsAirpost,
  SuggestsTramDung, checkTuyenTramDung
};
