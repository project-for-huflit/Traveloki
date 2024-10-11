'use strict';

const mongoose = require('mongoose');

const LichSuDatTauSchema = new mongoose.Schema({
  MaKH: { type: String, required: true },
  MaDX: { type: String, ref: 'PhieuDatTau' },
  Date: { type: Date },
});

module.exports = {
  LichSuDatTaus: mongoose.model('LichSuDatTau', LichSuDatTauSchema)
};
