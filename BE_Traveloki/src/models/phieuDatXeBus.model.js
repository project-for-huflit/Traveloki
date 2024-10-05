const { Schema, model } = require('mongoose');
const COLLECTION_NAME = 'PhieuDatXeBuses'

const PhieuDatXeBusSchema = new Schema({
  MaVeBus: { type: String, required: true, maxlength: 5 },
  MaPT: { type: String, ref: "PhuongTien" },
  MaTram: { type: String, ref: "TramDung" },
  SLVe: { type: Number, required: true },
  DiemDon: { type: String, required: true, maxlength: 100 },
  DiemTra: { type: String, required: true, maxlength: 100 },
  NgayGioKhoiHanh: { type: Date, required: true },
  ThanhTien: { type: Number, required: true },
  TrangThai: { type: Boolean, required: true },
},{
  timestamps: true,
  collection: COLLECTION_NAME
});

module.exports = {
  PhieuDatXeBus: model("PhieuDatXeBus", PhieuDatXeBusSchema)
};
