const { Schema, model } = require('mongoose');
const COLLECTION_NAME = 'Tuyens'

const TuyenSchema = new Schema({
  MaTuyen: { type: String, required: true, maxlength: 5 },
  DiemSanBay: { type: String, ref: "DanhSachSanBay", required: true },
  DiemKetThuc: { type: String, maxlength: 300, required: true },
  ThoiGianKhoiHanh: { type: Date, required: true },
  ThoiGianKetThuc: { type: Date, required: true },
},{
  timestamps: true,
  collection: COLLECTION_NAME
});

module.exports = {
  Tuyen: model("Tuyen", TuyenSchema)
};
