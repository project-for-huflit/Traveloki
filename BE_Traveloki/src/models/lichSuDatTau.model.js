'use strict'

const { Schema, model } = require('mongoose');

const LichSuDatTauSchema = new Schema({
  MaKH: { type: String, required: true },
  MaDX: { type: String, ref: "PhieuDatTau" },
  Date: { type: Date },
});


const LichSuDatTau = model("LichSuDatTau", LichSuDatTauSchema);


module.exports = {
  LichSuDatTau,

};
