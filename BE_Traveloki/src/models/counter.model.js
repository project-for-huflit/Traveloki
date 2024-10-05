const { Schema, model } = require('mongoose');

const counterSchema = new Schema({
  _id: String,
  seq: Number,
},{
  timestamps: true
});

module.exports = {
  CounterLSB: model("CounterLSB", counterSchema),
  CounterTuyen: model("CounterTuyen", counterSchema),
  CounterPhuongTien: model("CounterPhuongTien", counterSchema),
  CounterChitietxe: model("CounterChitietxe", counterSchema),
  CounterTramDung: model("CounterTramDung", counterSchema),
  CounterDatXe: model("CounterDatXe", counterSchema),
  CounterDatTau: model("CounterDatTau", counterSchema),
  CounterDatBuyt: model("CounterDatBuyt", counterSchema),
};
