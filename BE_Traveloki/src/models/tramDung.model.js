const { Schema, model } = require('mongoose');
const COLLECTION_NAME = 'TramDungs'

const TramDungSchema = new Schema({
  MaTram: { type: String, required: true, maxlength: 5 },
  DiaChi: { type: String, required: true },
  TenTramDung: { type: String, required: true },
},{
  timestamps: true,
  collection: COLLECTION_NAME
})

module.exports = {
  TramDung: model("TramDung", TramDungSchema)
};
