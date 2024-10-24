const { Schema, model } = require('mongoose');
const COLLECTION_NAME = 'PhieuDatTaus'

const PhieuDatTauSchema = new Schema({
  MaVeTau: { type: String, required: true, maxlength: 5 },
  MaPT: { type: String, ref: "PhuongTien" },
  MaTram: { type: String, ref: "TramDung" },
  SLVeNguoiLon: { type: Number, required: true },
  SLVeTreEm: { type: Number, required: true },
  DiemDon: { type: String, required: true, maxlength: 100 },
  DiemTra: { type: String, required: true, maxlength: 100 },
  NgayGioKhoiHanh: { type: String, required: true },
  ThanhTien: { type: Number, required: true },
  TrangThai: { type: Boolean, required: true },
  userId:{ type:Schema.Types.ObjectId, ref:'user', required:false },
},{
  timestamps: true,
  collection: COLLECTION_NAME
});

module.exports = {
  PhieuDatTau: model("PhieuDatTau", PhieuDatTauSchema)
};
