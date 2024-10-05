const { Schema, model } = require('mongoose');
const COLLECTION_NAME = 'LichSuDatXeBuses'

const LichSuDatXeBusSchema = new Schema({
  MaKH: { type: String, required: true },
  MaDX: { type: String, ref: "PhieuDatXeBus" },
  Date: { type: String },
},{
  timestamps: true,
  collection: COLLECTION_NAME
});

module.exports = {
  LichSuDatXeBus: model("LichSuDatXeBus", LichSuDatXeBusSchema)
};
