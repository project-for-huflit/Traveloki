'use strict'

const { Schema, model } = require('mongoose');

const counterSchema = new Schema({
  _id: String,
  seq: Number,
});

const CounterLSB = model("CounterLSB", counterSchema);
const CounterTuyen = model("CounterTuyen", counterSchema);
const CounterPhuongTien = model("CounterPhuongTien", counterSchema);
const CounterChitietxe = model("CounterChitietxe", counterSchema);
const CounterTramDung = model("CounterTramDung", counterSchema);
const CounterDatXe = model("CounterDatXe", counterSchema);
const CounterDatTau = model("CounterDatTau", counterSchema);
const CounterDatBuyt = model("CounterDatBuyt", counterSchema);

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
