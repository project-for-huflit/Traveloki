const { TramDung } = require('../models/tramDung.model');
const { TuyenTramDung } = require('../models/tuyenTramDung.model');

const getAllTramDungService = async () => {
  try {
    const result = await TramDung.find({});
    return {
      EC: 0,
      EM: 'Lấy trạm dừng thành công',
      data: result,
    };
  } catch (error) {
    return {
      EC: 1,
      EM: 'Không thể lấy trạm dừng',
      data: [],
    };
  }
};

const createTramDungService = async (
  parternId,
  ThanhPho,
  DiaChi,
  TenTramDung,
) => {
  try {
    // Kiểm tra trùng tên trạm dừng
    const existTenTramDung = await TramDung.exists({ TenTramDung });
    if (existTenTramDung) {
      console.log(`TramDung exists ${TenTramDung}`);
      return {
        EC: 1,
        EM: 'Tên trạm dừng đã tồn tại',
      };
    }

    // Kiểm tra trùng địa chỉ
    const existDiaChi = await TramDung.exists({ DiaChi });
    if (existDiaChi) {
      console.log(`DiaChi exists ${DiaChi}`);
      return {
        EC: 1,
        EM: 'Địa chỉ đã tồn tại',
      };
    }

    // Sử dụng aggregate để lấy mã trạm dừng lớn nhất
    const lastTramDung = await TramDung.aggregate([
      {
        $addFields: {
          numericMaTramDung: { $toInt: { $substr: ['$MaTramDung', 2, -1] } },
        },
      },
      { $sort: { numericMaTramDung: -1 } },
      { $limit: 1 },
    ]);

    // Khởi tạo mã trạm dừng mới
    let newMaTramDung = 'TD1';
    if (lastTramDung.length > 0 && lastTramDung[0].numericMaTramDung) {
      const lastNumber = lastTramDung[0].numericMaTramDung;
      newMaTramDung = `TD${lastNumber + 1}`;
    }

    // Tạo trạm dừng mới
    const result = await TramDung.create({
      parternId,
      MaTramDung: newMaTramDung,
      ThanhPho: ThanhPho,
      DiaChi: DiaChi,
      TenTramDung: TenTramDung,
    });

    return {
      EC: 0,
      EM: 'Tạo trạm dừng thành công',
      data: result,
    };
  } catch (error) {
    console.log(error);
    return {
      EC: 1,
      EM: 'Không thể tạo trạm dừng',
      data: [],
    };
  }
};

const deleteTramDungService = async (id) => {
  try {
    const tuyenTramDung = await TuyenTramDung.find({ MaTramDung: id });
    if (tuyenTramDung.length > 0) {
      return {
        EC: 1,
        EM: 'Không thể xóa trạm dừng khi vẫn còn trong tuyến trạm dừng',
      };
    }

    const result = await TramDung.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      return {
        EC: 1,
        EM: 'Trạm dừng không tồn tại hoặc đã bị xóa',
      };
    }

    return {
      EC: 0,
      EM: 'Xóa trạm dừng thành công',
      data: result,
    };
  } catch (error) {
    console.error(error);
    return {
      EC: 1,
      EM: 'Không thể xóa trạm dừng',
      data: [],
    };
  }
};

const updateTramDungService = async (_id, ThanhPho, DiaChi, TenTramDung) => {
  try {
    const result = await TramDung.findOneAndUpdate(
      { _id: _id },
      { ThanhPho, DiaChi, TenTramDung },
      { new: true },
    );
    return {
      EC: 0,
      EM: 'Cập nhật trạm dừng thành công',
      data: result,
    };
  } catch (error) {
    console.log(error);
    return {
      EC: 1,
      EM: 'Không thể cập nhật trạm dừng',
      data: [],
    };
  }
};

module.exports = {
  getAllTramDungService,
  createTramDungService,
  deleteTramDungService,
  updateTramDungService,
};
