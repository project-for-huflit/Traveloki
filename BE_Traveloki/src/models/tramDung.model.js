const { Schema, model } = require('mongoose');
const COLLECTION_NAME = 'TramDungs'

const TramDungSchema = new Schema({
  MaTram: { type: String, required: true, maxlength: 5 },
  MaTuyen: { type: String, ref: "Tuyen" },
  DiaChi: { type: String, required: true, maxlength: 100 },
  SoKM: { type: Number, required: true },
  GiaTienVe: { type: Number, required: true },
  GiaTienVeTau: { type: Number, required: true },
},{
  timestamps: true,
  collection: COLLECTION_NAME
})


module.exports = {
  TramDung: model("TramDung", TramDungSchema)
};
