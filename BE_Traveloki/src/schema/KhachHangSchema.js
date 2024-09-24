'use strict'

const { Schema, model } = require('mongoose');

const KhachHangSchema = new mongoose.Schema({
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
});

const KhachHang = mongoose.model("KhachHang", KhachHangSchema);

module.exports = {
  KhachHang
};
