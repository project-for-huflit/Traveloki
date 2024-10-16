const { Schema, model } = require('mongoose');
const COLLECTION_NAME = 'TramDungs'

const TramDungSchema = new Schema({
  MaTram: { type: String, required: true, maxlength: 5 },
  MaTuyen: { type: String, ref: "Tuyens" },
  DiaChi: { type: String, required: true },
  SoKM: { type: Number, required: true },
  GiaTienVe: { type: Number, required: true },
  GiaTienVeTau: { type: Number, required: true },
  TenTramDung: { type: String, required: true },
},{
  timestamps: true,
  collection: COLLECTION_NAME
})

module.exports = {
  TramDung: model("TramDung", TramDungSchema)
};
