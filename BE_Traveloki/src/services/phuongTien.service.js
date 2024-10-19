const {PhuongTien} = require('../models/phuongTien.model');

const getAllPhuongTienService = async () => {
  try {
    const result = await PhuongTien.find().populate('MaSB');
    return {
      EC: 0,
      EM: "Lấy phương tiện thành công",
      data: result,
    };
  } catch (error) {
    console.log(error)
    return {
      EC: 1,
      EM: "Không thể lấy phương tiện",
      data: [],
    };
  }
}

const createPhuongTienService = async (LoaiPT, TenPhuongTien, MaSoXe, SoGheToiDa, Image, MaSB) => {
  try {
    let newMaPT = LoaiPT === 'bus' ? 'PTB' : 'PTT';

    const existingPhuongTien = await PhuongTien.findOne({ LoaiPT: LoaiPT, MaSoXe: MaSoXe }).exec();
    if (existingPhuongTien) {
      return {
        EC: 1,
        EM: `Mã số xe đã tồn tại cho loại phương tiện: ${LoaiPT}`,
        data: [],
      };
    }

    const lastPhuongTien = await PhuongTien.findOne({ LoaiPT }).sort({ MaPT: -1 }).exec();

    if (lastPhuongTien && lastPhuongTien.MaPT) {
      const lastNumber = parseInt(lastPhuongTien.MaPT.slice(3), 10);
      newMaPT = `${newMaPT}${lastNumber + 1}`;
    } else {
      newMaPT = `${newMaPT}1`;
    }

    const result = await PhuongTien.create({
      MaPT: newMaPT,
      LoaiPT: LoaiPT,
      TenPhuongTien: TenPhuongTien,
      MaSoXe: MaSoXe,
      SoGheToiDa: SoGheToiDa,
      Image: Image,
      MaSB: MaSB
    });

    return {
      EC: 0,
      EM: 'Tạo phương tiện thành công',
      data: result,
    };
  }catch (error) {
    console.log(error)
    return {
      EC: 1,
      EM: "Không thể tạo phương tiện",
      data: [],
    };
  }
}

const deletePhuongTienService = async (id) => {
  try {
    const result = await PhuongTien.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      return {
        EC: 1,
        EM: "Phương tiện không tồn tại hoặc đã bị xóa",
      };
    }
    return {
      EC: 0,
      EM: "Xóa phương tiện thành công",
      data: result,
    };
  } catch (error) {
    return {
      EC: 1,
      EM: "Không thể xóa phương tiện",
    };
  }
}

module.exports = {
  getAllPhuongTienService, createPhuongTienService, deletePhuongTienService
}
