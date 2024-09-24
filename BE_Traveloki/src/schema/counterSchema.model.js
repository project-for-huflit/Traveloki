'use strict'

const { Schema, model } = require('mongoose');

const counterSchema = new mongoose.Schema({
  _id: String,
  seq: Number,
});

const CounterLSB = mongoose.model("CounterLSB", counterSchema);
const CounterTuyen = mongoose.model("CounterTuyen", counterSchema);
const CounterPhuongTien = mongoose.model("CounterPhuongTien", counterSchema);
const CounterChitietxe = mongoose.model("CounterChitietxe", counterSchema);
const CounterTramDung = mongoose.model("CounterTramDung", counterSchema);
const CounterDatXe = mongoose.model("CounterDatXe", counterSchema);
const CounterDatTau = mongoose.model("CounterDatTau", counterSchema);
const CounterDatBuyt = mongoose.model("CounterDatBuyt", counterSchema);

module.exports = {
  CounterLSB,
  CounterTuyen,
  CounterPhuongTien,
  CounterChitietxe,
  CounterTramDung,
  CounterDatXe,
  CounterDatTau,
  CounterDatBuyt,
};
