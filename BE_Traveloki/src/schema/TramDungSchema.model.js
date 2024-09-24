'use strict'

const { Schema, model } = require('mongoose');

const TramDungSchema = new mongoose.Schema({
  MaTram: { type: String, required: true, maxlength: 5 },
  MaTuyen: { type: String, ref: "Tuyen" },
  DiaChi: { type: String, required: true, maxlength: 100 },
  SoKM: { type: Number, required: true },
  GiaTienVe: { type: Number, required: true },
  GiaTienVeTau: { type: Number, required: true },
});

const TramDung = mongoose.model("TramDung", TramDungSchema);


module.exports = {
  TramDung,
};
