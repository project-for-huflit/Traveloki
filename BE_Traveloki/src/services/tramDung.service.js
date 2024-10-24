const {TramDung} = require("../models/tramDung.model");
const {TuyenTramDung} = require("../models/tuyenTramDung.model");

const getAllTramDungService = async () => {
  try {
    const result = await TramDung.find({});
    return {
      EC: 0,
      EM: "Lấy trạm dừng thành công",
      data: result,
    };
  } catch (error) {
    return {
      EC: 1,
        EM: "Không thể lấy trạm dừng",
        data: [],
    };
  }
}

const createTramDungService = async (DiaChi, TenTramDung) => {
  try{
    const existTenTramDung = await TramDung.exists({TenTramDung});
    if (existTenTramDung){
      console.log(`TramDung exists ${TenTramDung}`);
      return {
        EC: 1,
        EM: "Tên trạm dừng đã tồn tại",
      }
    }

    const existDiaChi = await TramDung.exists({DiaChi});
    if (existDiaChi){
      console.log(`DiaChi exists ${DiaChi}`);
      return {
        EC: 1,
        EM: "Địa chỉ đã tồn tại",
      }
    }
    // Lấy trạm dừng có mã lớn nhất để tạo mã mới
    const lastTramDung = await TramDung.findOne().sort({ MaTramDung: -1 }).exec();
    let newMaTramDung = "TD1"; // Nếu chưa có trạm dừng nào, khởi tạo mặc định là TD1

    if (lastTramDung && lastTramDung.MaTramDung) {
      const lastNumber = parseInt(lastTramDung.MaTramDung.slice(2), 10); // Lấy phần số
      newMaTramDung = `TD${lastNumber + 1}`; // Tăng số lên
    }

    const result = await TramDung.create({
      MaTramDung: newMaTramDung,
      DiaChi: DiaChi,
      TenTramDung: TenTramDung
    });
    return {
      EC: 0,
      EM: "Tạo trạm dừng thành công",
      data: result,
    };
  }catch (error){
    console.log(error);
    return {
      EC: 1,
      EM: "Không thể tạo trạm dừng",
      data: [],
    }
  }
}

const deleteTramDungService = async (id) => {
  try {
    const tuyenTramDung = await TuyenTramDung.find({ MaTramDung: id });
    if (tuyenTramDung.length > 0) {
      return {
        EC: 1,
        EM: "Không thể xóa trạm dừng khi vẫn còn trong tuyến trạm dừng",
      };
    }

    const result = await TramDung.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      return {
        EC: 1,
        EM: "Trạm dừng không tồn tại hoặc đã bị xóa",
      };
    }

    return {
      EC: 0,
      EM: "Xóa trạm dừng thành công",
      data: result,
    };
  } catch (error) {
    console.error(error);
    return {
      EC: 1,
      EM: "Không thể xóa trạm dừng",
      data: [],
    };
  }
};


module.exports = {
  getAllTramDungService, createTramDungService, deleteTramDungService
}
