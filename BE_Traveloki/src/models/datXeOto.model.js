const { Schema, model, Types } = require('mongoose');
const COLLECTION_NAME = 'DatXeOtos'

const DatXeOtoSchema = new Schema({
  MaDX: { type: String, required: true, maxlength: 5 },
  MaDetailCar: { type: String, ref: "ChiTietXeOto" },
  Sdt: { type: String, ref: "KhachHang" },
  MaTram: { type: String, ref: "TramDung" },
  DiemSanBay: { type: String, required: true, maxlength: 100 },
  DiemDon_Tra: { type: String, required: true, maxlength: 100 },
  NgayGioDat: { type: String, required: true },
  ThanhTien: { type: Number, required: true },
  Trangthai: { type: Boolean, required: true },
  Description: { type: String, maxlength: 500 },
  userId:{ type:Schema.Types.ObjectId, ref:'user', required:false },
},{
  timestamps: true,
  collection: COLLECTION_NAME
});

module.exports = {
  DatXeOto: model("DatXeOto", DatXeOtoSchema)
};
