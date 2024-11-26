const { Schema, model } = require('mongoose');
const COLLECTION_NAME = 'TramDungs';

const TramDungSchema = new Schema(
  {
    parternId: {
      type: Schema.Types.ObjectId,
      ref: 'partner',
      required: true,
    },
    MaTramDung: { type: String, required: true, maxlength: 5 },
    ThanhPho: { type: String, required: true },
    DiaChi: { type: String, required: true },
    TenTramDung: { type: String, required: true },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  },
);

module.exports = {
  TramDung: model('TramDung', TramDungSchema),
};
