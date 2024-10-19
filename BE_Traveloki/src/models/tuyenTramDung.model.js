const { Schema, model } = require('mongoose');
const COLLECTION_NAME = 'TuyenTramDungs'

const TuyenTramDungSchema = new Schema({
  MaTuyenTramDung: {
    type: String,
    required: true,
    maxlength: 5,
  },
  MaTuyen: {
    type: Schema.Types.ObjectId,
    ref: 'Tuyen',
    required: true
  },
  MaTramDung: {
    type: Schema.Types.ObjectId,
    ref: 'TramDung',
    required: true,
  },
  SoKM: {
    type: Number,
    required: true,
  },
  GiaVe: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true,
  collection: COLLECTION_NAME,
});

module.exports = {
  TuyenTramDung: model('TuyenTramDung', TuyenTramDungSchema),
};
