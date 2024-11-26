const { Tuyen } = require('../models/tuyen.model');
const { TuyenTramDung } = require('../models/tuyenTramDung.model');
const { startSession } = require('mongoose');
const { LichChay } = require('../models/lichChay.model');

const getAllTuyenService = async () => {
  try {
    const result = await TuyenTramDung.find()
      .populate('MaTuyen')
      .populate('MaTramDung');

    // thay đổi cấu trúc thể hiện dữ liệu
    const tuyenMap = {};

    result.forEach((item) => {
      const tuyenId = item.MaTuyen._id;
      const tuyenName = item.MaTuyen.MaTuyen;
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
    const resultArray = Object.values(tuyenMap).map((item) => item.tuyen);

    return {
      EC: 0,
      EM: 'Lấy tuyến thành công',
      data: resultArray,
    };
  } catch (error) {
    console.log(error);
    return {
      EC: 1,
      EM: 'Không thể lấy tuyến',
      data: [],
    };
  }
};

const createTuyenService = async (
  parternId,
  TramList,
  DiemKhoiHanh,
  DiemKetThuc,
  ThoiGianKhoiHanh,
  ThoiGianKetThuc,
) => {
  if (!TramList || TramList.length === 0) {
    return {
      EC: 1,
      EM: 'Không thể tạo tuyến vì không có trạm dừng',
    };
  }

  const session = await startSession();
  session.startTransaction();

  try {
    const existTuyen = await Tuyen.exists({
      DiemKhoiHanh: DiemKhoiHanh,
      DiemKetThuc: DiemKetThuc,
    });

    if (existTuyen) {
      return {
        EC: 1,
        EM: 'Tuyến với điểm khởi hành và kết thúc đã tồn tại',
      };
    }

    // Sử dụng aggregate để lấy mã tuyến lớn nhất
    const lastTuyen = await Tuyen.aggregate([
      {
        $addFields: {
          numericMaTuyen: { $toInt: { $substr: ['$MaTuyen', 1, -1] } }, // Lấy phần số sau ký tự 'T'
        },
      },
      { $sort: { numericMaTuyen: -1 } }, // Sắp xếp giảm dần theo số
      { $limit: 1 }, // Chỉ lấy tuyến có số lớn nhất
    ]);
    console.log('lastTuyen', lastTuyen);
    // Tạo mã tuyến mới
    let newMaTuyen = 'T1';
    if (lastTuyen.length > 0 && lastTuyen[0].numericMaTuyen) {
      const lastNumber = parseInt(lastTuyen[0].numericMaTuyen, 10);
      newMaTuyen = `T${lastNumber + 1}`;
      console.log('newMaTuyen', newMaTuyen);
    }

    // Tạo tuyến mới
    const newTuyen = await Tuyen.create(
      [
        {
          parternId,
          MaTuyen: newMaTuyen,
          DiemKhoiHanh: DiemKhoiHanh,
          DiemKetThuc: DiemKetThuc,
          ThoiGianKhoiHanh: ThoiGianKhoiHanh,
          ThoiGianKetThuc: ThoiGianKetThuc,
        },
      ],
      { session },
    );

    // Xử lý bảng TuyenTramDung
    let lastTuyenTramDung = await TuyenTramDung.aggregate([
      {
        $addFields: {
          numericMaTuyenTramDung: {
            $toInt: { $substr: ['$MaTuyenTramDung', 3, -1] },
          },
        },
      },
      { $sort: { numericMaTuyenTramDung: -1 } },
      { $limit: 1 },
    ]);
    let lastNumberTTD =
      lastTuyenTramDung.length > 0
        ? parseInt(lastTuyenTramDung[0].numericMaTuyenTramDung, 10)
        : 0;

    const tuyenTramDung = await TuyenTramDung.insertMany(
      TramList.map((item, index) => {
        const newMaTuyenTramDung = `TTD${lastNumberTTD + index + 1}`;
        return {
          MaTuyenTramDung: newMaTuyenTramDung,
          MaTuyen: newTuyen[0]._id,
          MaTramDung: item.MaTramDung,
          SoKM: item.SoKM,
          GiaVe: item.GiaVe,
        };
      }),
      { session },
    );

    await session.commitTransaction();
    await session.endSession();

    return {
      EC: 0,
      EM: 'Tạo tuyến thành công',
      data: { tuyen: newTuyen[0], tuyenTramDung },
    };
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    console.log(`Error in creating route: ${error.message}`);
    return {
      EC: 1,
      EM: 'Không thể tạo tuyến',
    };
  }
};

const updateTuyenService = async (
  id,
  DiemKhoiHanh,
  DiemKetThuc,
  ThoiGianKhoiHanh,
  ThoiGianKetThuc,
) => {};

const deleteTuyenService = async (id) => {
  try {
    const checkTuyenInLichChay = await LichChay.find({ MaTuyen: id });
    if (checkTuyenInLichChay.length > 0) {
      return {
        EC: 1,
        EM: 'Không thể xóa tuyến khi vẫn còn trong lịch chạy',
      };
    }

    const deletedTuyenTramDung = await TuyenTramDung.deleteMany({
      MaTuyen: id,
    });

    const result = await Tuyen.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      return {
        EC: 1,
        EM: 'Tuyến không tồn tại hoặc đã bị xóa',
      };
    }
    return {
      EC: 0,
      EM: 'Xóa tuyến thành công',
      data: result,
    };
  } catch (error) {
    return {
      EC: 1,
      EM: 'Không thể xóa tuyến',
    };
  }
};

module.exports = {
  getAllTuyenService,
  createTuyenService,
  deleteTuyenService,
  updateTuyenService,
};
