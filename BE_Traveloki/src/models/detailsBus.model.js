const { Schema, model } = require('mongoose');

const COLLECTION_NAME = 'ChiTietXeBuses'

const ChiTietXeBusSchema = new Schema({
  MaDetailBus: { type: String, required: true },
  TenHangXe: { type: String, required: true, maxlength: 100 },
  TenChuSoHuu: { type: String, required: true, maxlength: 100 },
  SoHanhLyToiDa: { type: Number, required: true },
  BienSoXe: { type: String, required: true, maxlength: 10 },
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
  ChiTietXeBus: model("ChiTietXeBus", ChiTietXeBusSchema)
};
