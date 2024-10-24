const {LichChay} = require('../models/lichChay.model');

const getAllLichChayService = async () => {
  try {
    const result = await LichChay.find()
      .populate('MaTuyen')
      .populate('MaPT');

    return {
      EC: 0,
      EM: "Lấy lịch chạy thành công",
      data: result
    }
  }catch (error){
    console.error('Error in createLichChayService:', error);
    return {
      EC: 1,
      EM: "Không thể lấy lịch chạy",
      data: []
    }
  }
}

const createLichChayService = async (MaPT, MaTuyen, ngayKhoiHanh, gioKhoiHanh, gioKetThuc) => {
  try {
    const result = await LichChay.create({
      MaPT: MaPT,
      MaTuyen: MaTuyen,
      ngayKhoiHanh: ngayKhoiHanh,
      gioKhoiHanh: gioKhoiHanh,
      gioKetThuc: gioKetThuc,
    });
    return {
      EC: 0,
      EM: "Tạo lịch chạy thành công",
      data: result
    }
  }catch (error){
    console.error('Error in createLichChayService:', error);
    return {
      EC: 1,
      EM: "Không thể tạo lịch chạy",
      data: []
    }
  }
}

const deleteLichChayService = async (id) => {
  try {
    const result = await LichChay.deleteOne({_id: id});
    return {
      EC: 0,
      EM: "Xóa lịch chạy thành công",
      data: result
    }
  }catch (error){
    console.error('Error in createLichChayService:', error);
    return {
      EC: 1,
      EM: "Không thể xóa lịch chạy",
      data: []
    }
  }
}

const updateLichChayService = async (id, MaPT, MaTuyen, ngayKhoiHanh, gioKhoiHanh, gioKetThuc) => {
  try {
    const result = await LichChay.updateOne({_id: id}, {
      MaPT: MaPT,
      MaTuyen: MaTuyen,
      ngayKhoiHanh: ngayKhoiHanh,
      gioKhoiHanh: gioKhoiHanh,
      gioKetThuc: gioKetThuc,
    });
    return {
      EC: 0,
      EM: "Cập nhật lịch chạy thành công",
      data: result
    }
  }catch (error){
    return {
      EC: 1,
      EM: "Không thể cập nhật lịch chạy",
      data: []
    }
  }
}

module.exports = {
  getAllLichChayService, createLichChayService, deleteLichChayService, updateLichChayService

}
