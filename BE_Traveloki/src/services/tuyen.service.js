const {Tuyen} = require("../models/tuyen.model");
const {TuyenTramDung} = require("../models/tuyenTramDung.model");
const {startSession} = require("mongoose");

const getAllTuyenService = async () => {
  try {
    const result = await TuyenTramDung.find()
      .populate( "MaTuyen")
      .populate( "MaTramDung");

    // thay đổi cấu trúc thể hiện dữ liệu
    const tuyenMap = {};

    result.forEach(item => {
      const tuyenId = item.MaTuyen._id;
      const tuyenName  = item.MaTuyen.MaTuyen
      if (!tuyenMap[tuyenId]) {
        tuyenMap[tuyenId] = {
          tuyen: {
            _id: tuyenId,
            MaTuyen: tuyenName,
            DiemKhoiHanh: item.MaTuyen.DiemKhoiHanh,
            DiemKetThuc: item.MaTuyen.DiemKetThuc,
            ThoiGianKhoiHanh: item.MaTuyen.ThoiGianKhoiHanh,
            ThoiGianKetThuc: item.MaTuyen.ThoiGianKetThuc,
            tramDungs: [],
          },
        };
      }

      tuyenMap[tuyenId].tuyen.tramDungs.push({
        _id: item.MaTramDung._id,
        MaTramDung: item.MaTramDung.MaTramDung,
        TenTramDung: item.MaTramDung.TenTramDung,
        DiaChi: item.DiaChi,
        SoKM: item.SoKM,
        GiaVe: item.GiaVe,
      });
    });


    // Chuyển đổi map thành array
    const resultArray = Object.values(tuyenMap).map(item => item.tuyen);

    return {
      EC: 0,
      EM: "Lấy tuyến thành công",
      data: resultArray,
    };
  } catch (error) {
    console.log(error)
    return {
      EC: 1,
      EM: "Không thể lấy tuyến",
      data: [],
    };
  }
}

const createTuyenService = async (TramList, DiemKhoiHanh, DiemKetThuc, ThoiGianKhoiHanh, ThoiGianKetThuc) => {
  if (!TramList || TramList.length === 0) {
    return {
      EC: 1,
      EM: "Không thể tạo tuyến vì không có trạm dừng",
    };
  }

  const session = await startSession();
  session.startTransaction();

  try {
    const existTuyen = await Tuyen.exists({
      DiemKhoiHanh: DiemKhoiHanh,
      DiemKetThuc: DiemKetThuc
    });

    if (existTuyen) {
      return {
        EC: 1,
        EM: "Tuyến với điểm khởi hành và kết thúc đã tồn tại",
      }
    }

    //step 1
    const lastTuyen = await Tuyen.findOne().sort({MaTuyen: -1}).exec();
    let newMaTuyen = "T1";

    if (lastTuyen && lastTuyen.MaTuyen) {
      const lastNumber = parseInt(lastTuyen.MaTuyen.slice(1), 10); // Lấy phần số
      newMaTuyen = `T${lastNumber + 1}`; // Tăng số lên
    }

    const newTuyen = await Tuyen.create([{
      MaTuyen: newMaTuyen,
      DiemKhoiHanh: DiemKhoiHanh,
      DiemKetThuc: DiemKetThuc,
      ThoiGianKhoiHanh: ThoiGianKhoiHanh,
      ThoiGianKetThuc: ThoiGianKetThuc,
    }], {session});

    //step 2
    let lastTuyenTramDung = await TuyenTramDung.findOne().sort({ MaTuyenTramDung: -1 }).exec();
    let lastNumberTTD = lastTuyenTramDung ? parseInt(lastTuyenTramDung.MaTuyenTramDung.slice(3), 10) : 0;

    const tuyenTramDung = await TuyenTramDung.insertMany(TramList.map((item, index) => {
      const newMaTuyenTramDung = `TTD${lastNumberTTD + index + 1}`;
      return {
        MaTuyenTramDung: newMaTuyenTramDung,
        MaTuyen: newTuyen[0]._id,
        MaTramDung: item.MaTramDung,
        SoKM: item.SoKM,
        GiaVe: item.GiaVe,
      };
    }), { session });

    await session.commitTransaction();
    await session.endSession();

    return {
      EC: 0,
      EM: "Tạo tuyến thành công",
      data: {tuyen: newTuyen[0], tuyenTramDung},
    };

  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    console.log(`Error in creating order: ${error.message}`);
    return {
      EC: 1,
      EM: "Không thể tạo tuyến",
    };
  }
}

const updateTuyenService = async (id, DiemKhoiHanh, DiemKetThuc, ThoiGianKhoiHanh, ThoiGianKetThuc) => {

}

const deleteTuyenService = async (id) => {
  try {
    const tuyenTramDung = await TuyenTramDung.find({MaTuyen: id});
    if (tuyenTramDung.length > 0) {
      return {
        EC: 1,
        EM: "Không thể xóa tuyến dừng khi vẫn còn trong tuyến trạm dừng",
      };
    }

    const result = await Tuyen.deleteOne({_id: id});
    if (result.deletedCount === 0) {
      return {
        EC: 1,
        EM: "Tuyến không tồn tại hoặc đã bị xóa",
      };
    }
    return {
      EC: 0,
      EM: "Xóa tuyến thành công",
      data: result,
    };
  } catch (error) {
    return {
      EC: 1,
      EM: "Không thể xóa tuyến",
    };
  }
}

module.exports = {
  getAllTuyenService, createTuyenService, deleteTuyenService, updateTuyenService
}
