const { Schema, model } = require('mongoose');
const COLLECTION_NAME = 'KhachHangs'

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
  timestamps: true,
  collection: COLLECTION_NAME
});

module.exports = {
  customer: model("KhachHang", KhachHangSchema)
}
