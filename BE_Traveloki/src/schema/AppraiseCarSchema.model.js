'use strict'

const { Schema, model } = require('mongoose');

const AppraiseCarSchema = new mongoose.Schema({
  MaDX: { type: String, ref: "DatXeOto" },
  MaCus: { type: String, ref: "KhachHang" },
  SoSao: { type: Number, required: true },
  NoiDung: { type: String, required: true, maxlength: 500 },
});

const AppraiseCar = mongoose.model("AppraiseCar", AppraiseCarSchema);

module.exports = {
  AppraiseCar,
};
