const { Schema, model } = require('mongoose');
const COLLECTION_NAME = 'Tuyens';

const TuyenSchema = new Schema(
  {
    parternId: {
      type: Schema.Types.ObjectId,
      ref: 'partner',
      required: true,
    },
    MaTuyen: { type: String, required: true, maxlength: 5 },
    DiemKhoiHanh: { type: String, required: true },
    DiemKetThuc: { type: String, required: true },
    ThoiGianKhoiHanh: { type: String, required: true },
    ThoiGianKetThuc: { type: String, required: true },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  },
);

module.exports = {
  Tuyen: model('Tuyen', TuyenSchema),
};
