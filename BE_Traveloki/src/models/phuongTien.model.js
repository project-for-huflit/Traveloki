const { Schema, model } = require('mongoose');
const COLLECTION_NAME = 'PhuongTiens'

const PhuongTienSchema = new Schema({
  MaPT: { type: String, required: true, maxlength: 5 },
  MaTuyen: { type: String, required: true, ref: "Tuyen" },
  MaLoai: { type: Boolean, required: true },
  TenPhuongTien: { type: String, required: true, maxlength: 100 },
  SoGheToiDa: { type: Number, required: true },
  image: { type: String, required: true },
  TenCty: { type: String, required: true, maxlength: 100 },
},{
  timestamps: true,
  collection: COLLECTION_NAME
});

module.exports = {
  PhuongTien: model("PhuongTien", PhuongTienSchema)
};
