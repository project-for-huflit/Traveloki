const { Schema, model } = require('mongoose');
const COLLECTION_NAME = 'DanhSachSanBays'
const DanhSachSanBaySchema = new Schema({
  MaSB: { type: String, required: true },
  TenSanBay: { type: String, required: true, maxlength: 100 },
  ThanhPho: { type: String, required: true, maxlength: 100 },
},{
  timestamps: true,
  collection: COLLECTION_NAME
});
module.exports = {
  DanhSachSanBay: model("DanhSachSanBay", DanhSachSanBaySchema)
};
