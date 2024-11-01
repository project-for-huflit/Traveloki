const { Schema, model} = require('mongoose');
const COLLECTION_NAME = 'LichChays'

const LichChaySchema = new Schema({
    MaPT:{
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'PhuongTien'
    },
    MaTuyen:{
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Tuyen'
    },
    ngayKhoiHanh: {
      type: String,
      required: true
    },
    gioKhoiHanh: {
      type: String,
      required: true
    },
    gioKetThuc: {
      type: String,
      required: true
    },
    SLVe: {
      type: Number,
      required: true
    },
    SLVeConLai: {
      type: Number,
      required: true
    },
    trangThai: {
      type: String,
      enum: ["Đã lên lịch", "Đang hoạt động", "Bị trì hoãn", "Đã hoàn thành", "Đã hủy", "Bảo trì"],
    }
  },{
    timestamps: true,
    collection: COLLECTION_NAME
  }
)

module.exports = {
  LichChay: model('LichChay', LichChaySchema)
};


