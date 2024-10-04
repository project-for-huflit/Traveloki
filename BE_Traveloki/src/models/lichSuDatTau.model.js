const { Schema, model } = require('mongoose');
const COLLECTION_NAME = 'LichSuDatTaus'

const LichSuDatTauSchema = new Schema({
  MaKH: { type: String, required: true },
  MaDX: { type: String, ref: "PhieuDatTau" },
  Date: { type: Date },
},{
  timestamps: true,
  collection: COLLECTION_NAME
});


const LichSuDatTau = model("LichSuDatTau", LichSuDatTauSchema);

module.exports = {
  LichSuDatTau,

};
