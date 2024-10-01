const { Schema, model } = require('mongoose');

const KhachHangSchema = new Schema({
  MaCus: {
    type: String,
    required: true,

    maxlength: 5,
  },
  TenKH: {
    type: String,
    maxlength: 100,
  },
  Sdt: {
    type: String,
    maxlength: 10,
  },
},{
  timestamps: true
});

const KhachHang = model("KhachHang", KhachHangSchema);

module.exports = {
  KhachHang
};
