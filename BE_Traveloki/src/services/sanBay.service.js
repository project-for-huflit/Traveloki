const {SanBay} = require('../models/sanBay.model');
const {PhuongTien} = require("../models/phuongTien.model");

const getAllSanBayService = async () => {
  try {
    const result = await SanBay.find({})
    return {
      EC: 0,
      EM: "Lấy sân bay thành công",
      data: result
    }
  }catch (error){
    return {
      EC: 1,
      EM: "Không thể lấy sân bay",
      data: []
    }
  }
}

const createSanBayService = async (TenSanBay, ThanhPho) => {
  try {
    const existTenSanBay = await SanBay.exists({ TenSanBay });
    if (existTenSanBay) {
      console.log(`SanBay exists: ${TenSanBay}`);
      return {
        EC: 1,
        EM: "Tên sân bay đã tồn tại",
      };
    }

    // Sử dụng aggregate để lấy mã sân bay lớn nhất
    const lastSanBay = await SanBay.aggregate([
      {
        $addFields: {
          numericMaSB: { $toInt: { $substr: ["$MaSB", 2, -1] } }, // Tách phần số trong MaSB
        },
      },
      { $sort: { numericMaSB: -1 } }, // Sắp xếp giảm dần theo số
      { $limit: 1 }, // Lấy 1 bản ghi
    ]);

    // Khởi tạo mã sân bay mới
    let newMaSB = "SB1";
    if (lastSanBay.length > 0 && lastSanBay[0].numericMaSB) {
      const lastNumber = lastSanBay[0].numericMaSB;
      newMaSB = `SB${lastNumber + 1}`; // Tăng số lên 1
    }

    // Tạo sân bay mới
    const result = await SanBay.create({
      MaSB: newMaSB,
      TenSanBay: TenSanBay,
      ThanhPho: ThanhPho,
    });

    return {
      EC: 0,
      EM: "Tạo sân bay thành công",
      data: result,
    };
  } catch (error) {
    console.log(error);
    return {
      EC: 1,
      EM: "Không thể tạo sân bay",
      data: [],
    };
  }
};


const deleteSanBayService = async (id) => {
  try {
    const phuongTien = await PhuongTien.find({ MaSB: id });
    if (phuongTien.length > 0) {
      return {
        EC: 1,
        EM: "Không thể xóa sân bay khi vẫn còn trong phương tiện",
      };
    }

    const result = await SanBay.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      return {
        EC: 1,
        EM: "Trạm dừng không tồn tại hoặc đã bị xóa",
      };
    }

    return {
      EC: 0,
      EM: "Xóa sân bay thành công",
      data: result,
    };
  } catch (error) {
    console.error(error);
    return {
      EC: 1,
      EM: "Không thể xóa sân bay",
      data: [],
    };
  }
};

module.exports = {
  getAllSanBayService, createSanBayService, deleteSanBayService
}
