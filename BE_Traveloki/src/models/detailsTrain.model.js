const { Schema, model } = require('mongoose');
const COLLECTION_NAME = 'ChiTietXeTrains'

const ChiTietTrainSchema = new Schema({
  MaDetailTrain: { type: String, required: true },
  TenHangXe: { type: String, required: true, maxlength: 100 },
  TenChuSoHuu: { type: String, required: true, maxlength: 100 },
  SoHanhLyToiDa: { type: Number, required: true },
  BienSo: { type: String, required: true, maxlength: 10 },
  CongTy: { type: String, required: true, maxlength: 100 },
  SDT_TaiXe: { type: String, required: true, maxlength: 10 },
  SoGheToiDa: { type: Number, required: true },
  SoTien_1km: { type: Number, required: true },
  Image: { type: String, required: true },
  MaSB: { type: String, ref: "DanhSachSanBay" },
  ratingsAverage: {
    type: Number,
    default: 4.5,
    min: [1, 'Rating must be above 1.0'],
    max: [5, 'Rating must be above 5.0'],
    set: (val) => Math.round(val * 10) / 10
  },
},{
  timestamps: true,
  collection: COLLECTION_NAME
});

module.exports = {
  ChiTietXeTrain: model("ChiTietXeTrain", ChiTietXeTrainSchema)
};
