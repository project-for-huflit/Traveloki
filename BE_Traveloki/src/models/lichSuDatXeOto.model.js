const { Schema, model } = require('mongoose');

const COLLECTION_NAME = 'LichSuDatXeOtos'

const LichSuDatXeOtoSchema = new Schema({
  MaKH: { type: String, required: true },
  MaDX: { type: String, ref: "DatXeOto" },
  Date: { type: String },
},{
  timestamps: true,
  collection: COLLECTION_NAME
});

module.exports = {
  LichSuDatXeOto: model("LichSuDatXeOto", LichSuDatXeOtoSchema)
};
