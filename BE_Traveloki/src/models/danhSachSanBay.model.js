const { Schema, model } = require('mongoose');

const DanhSachSanBaySchema = new Schema({
  MaSB: { type: String, required: true },
  TenSanBay: { type: String, required: true, maxlength: 100 },
  ThanhPho: { type: String, required: true, maxlength: 100 },
},{
  timestamps: true
});

const DanhSachSanBay = model("DanhSachSanBay", DanhSachSanBaySchema);

module.exports = {
  DanhSachSanBay,
};
