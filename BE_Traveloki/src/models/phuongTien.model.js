const { Schema, model } = require('mongoose');
const COLLECTION_NAME = 'PhuongTiens';

const PhuongTienSchema = new Schema(
  {
    parternId: {
      type: Schema.Types.ObjectId,
      ref: 'partner',
      required: true,
    },
    MaPT: { type: String, required: true, maxlength: 5 },
    LoaiPT: {
      type: String,
      required: true,
      enum: ['bus', 'train'],
      maxlength: 100,
    },
    MaSoXe: { type: String, maxlength: 20 },
    TenPhuongTien: { type: String, required: true, maxlength: 100 },
    SoGheToiDa: { type: Number, required: true },
    Image: { type: String, required: true },
    MaSB: {
      type: Schema.Types.ObjectId,
      ref: 'SanBay',
      required: true,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  },
);

module.exports = {
  PhuongTien: model('PhuongTien', PhuongTienSchema),
};
