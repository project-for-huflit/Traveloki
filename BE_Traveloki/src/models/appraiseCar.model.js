const { Schema, model } = require('mongoose');
const COLLECTION_NAME = 'AppraiseCars'

const AppraiseCarSchema = new Schema({
  MaDX: { type: String, ref: "DatXeOto" },
  MaCus: { type: String, ref: "KhachHang" },
  SoSao: { type: Number, required: true },
  NoiDung: { type: String, required: true, maxlength: 500 },
},{
  timestamps: true,
  collection: COLLECTION_NAME
});

const AppraiseCar = model("AppraiseCar", AppraiseCarSchema);

module.exports = {
  AppraiseCar,
};
