'use strict'

const { Schema, model } = require('mongoose');

const LichSuDatXeBusSchema = new mongoose.Schema({
  MaKH: { type: String, required: true },
  MaDX: { type: String, ref: "PhieuDatXeBus" },
  Date: { type: String },
});

const LichSuDatXeBus = mongoose.model("LichSuDatXeBus", LichSuDatXeBusSchema);


module.exports = {
  LichSuDatXeBus,
};
