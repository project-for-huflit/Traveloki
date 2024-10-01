'use strict'

const { Schema, model } = require('mongoose');


const LichSuDatXeOtoSchema = new Schema({
  MaKH: { type: String, required: true },
  MaDX: { type: String, ref: "DatXeOto" },
  Date: { type: String },
});

const LichSuDatXeOto = model("LichSuDatXeOto", LichSuDatXeOtoSchema);

module.exports = {
  LichSuDatXeOto,

};
