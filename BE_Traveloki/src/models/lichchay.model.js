const mongoose = require('mongoose');
const COLLECTION_NAME = 'LichChays'

const LichChaySchema = new mongoose.Schema({
    MaPT:{
      type: String,
      required: true,
      maxlength: 5,
      ref: 'PhuongTien'
    },
    MaTuyen:{
      type: String,
      required: true,
      maxlength: 5,
      ref: 'Tuyen'
    },
    ngayKhoiHanh: {
      type: Date,
      required: true
    },
    gioKhoiHanh: {
      type: String,
      required: true
    },
    trangThai: {
      type: String,
      enum: ["Đã lên lịch", "Đang hoạt động", "Bị trì hoãn", "Đã hoàn thành", "Đã hủy", "Bảo trì"],
      required: true
    }
  },{
    timestamps: true,
    collection: COLLECTION_NAME
  }
)

const LichChay = mongoose.model("LichChay", LichChaySchema);

module.exports = LichChay;


