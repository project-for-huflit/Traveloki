'use strict'

const { Schema, model } = require('mongoose');


const LichSuDatXeOtoSchema = new mongoose.Schema({
  MaKH: { type: String, required: true },
  MaDX: { type: String, ref: "DatXeOto" },
  Date: { type: String },
});

const LichSuDatXeOto = mongoose.model("LichSuDatXeOto", LichSuDatXeOtoSchema);

module.exports = {
  LichSuDatXeOto,

};
