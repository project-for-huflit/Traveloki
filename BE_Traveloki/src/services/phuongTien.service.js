const { PhuongTien } = require('../models/phuongTien.model');
const { LichChay } = require('../models/lichChay.model');
const VehicleFactory = require('../services/vehicleFactory.service');



const getAllPhuongTienService = async () => {
  try {
    const result = await PhuongTien.find()
      .populate('MaSB')
      .populate('parternId')
      .exec();
    return {
      EC: 0,
      EM: 'Lấy phương tiện thành công',
      data: result,
    };
  } catch (error) {
    console.log(error);
    return {
      EC: 1,
      EM: 'Không thể lấy phương tiện',
      data: [],
    };
  }
};

// cập nhật lại hàm theo Factory Pattern
const createPhuongTienService = async (type,data) => {
  try{
    const vehicleService = VehicleFactory.createVehicle(type);
    const newvehicle = vehicleService.createVehicle(data);

    const res = await PhuongTien.create(newvehicle);
    return {
      EC: 0,
      EM: 'Tạo phương tiện thành công',
      data: res
    };
  }
  catch{
    console.error(error);
    return {
      EC: 1,
      EM: 'Không thể tạo phương tiện',
      data: []
    }
    

  }
};

const deletePhuongTienService = async (id) => {
  try {
    const checkPhuongTienInLichChay = await LichChay.findOne({ MaPT: id });
    if (checkPhuongTienInLichChay) {
      return {
        EC: 1,
        EM: 'Không thể xóa phương tiện vì phương tiện đang được sử dụng trong lịch chạy',
      };
    }

    const result = await PhuongTien.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      return {
        EC: 1,
        EM: 'Phương tiện không tồn tại hoặc đã bị xóa',
      };
    }
    return {
      EC: 0,
      EM: 'Xóa phương tiện thành công',
      data: result,
    };
  } catch (error) {
    return {
      EC: 1,
      EM: 'Không thể xóa phương tiện',
    };
  }
};

const getPhuongTienByLichChayService = async (MaTuyen) => {
  try {
    const result = await LichChay.find({
      MaTuyen: { $in: MaTuyen },
    }).populate('MaPT');
    return {
      EC: 0,
      EM: 'Lấy phương tiện đang hoạt động theo tuyến thành công',
      data: result,
    };
  } catch (error) {
    console.error('Có lỗi xảy ra khi tìm phương tiện theo lịch chạy:', error);
    throw error;
  }
};

const updatePhuongTienService = async (
  _id,
  LoaiPT,
  MaSoXe,
  TenPhuongTien,
  SoGheToiDa,
  Image,
  MaSB,
) => {
  try {
    const existingPhuongTien = await PhuongTien.findOne({
      MaSoXe,
      _id: { $ne: _id },
    }).exec();
    if (existingPhuongTien) {
      return {
        EC: 1,
        EM: 'Mã số xe đã tồn tại, vui lòng chọn mã số khác',
        data: [],
      };
    }
    const phuongTien = await PhuongTien.findOneAndUpdate(
      { _id: _id },
      {
        $set: {
          LoaiPT: LoaiPT,
          MaSoXe: MaSoXe,
          TenPhuongTien: TenPhuongTien,
          SoGheToiDa: SoGheToiDa,
          Image: Image,
          MaSB: MaSB,
        },
      },
      { new: true },
    );
    if (!phuongTien) {
      return {
        EC: 1,
        EM: 'Phương tiện không tồn tại hoặc đã bị xóa',
        data: [],
      };
    }
    return {
      EC: 0,
      EM: 'Cập nhật phương tiện thành công',
      data: phuongTien,
    };
  } catch (error) {
    console.error('Có lỗi xảy ra khi cập nhật phương tiện:', error);
    return {
      EC: 1,
      EM: 'Không thể cập nhật phương tiện',
      data: [],
    };
  }
};

module.exports = {
  getAllPhuongTienService,
  createPhuongTienService,
  deletePhuongTienService,
  getPhuongTienByLichChayService,
  updatePhuongTienService,
};
