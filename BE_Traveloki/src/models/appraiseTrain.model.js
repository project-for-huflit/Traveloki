const { Schema, model } = require('mongoose');

const AppraiseTrainSchema = new Schema({
  MaTau: { type: String, ref: "PhieuDatTau" },
  MaCus: { type: String, ref: "KhachHang" },
  SoSao: { type: Number, required: true },
  NoiDung: { type: String, required: true, maxlength: 500 },
},{
  timestamps: true
});

module.exports = {
  AppraiseTrain: model("AppraiseTrain", AppraiseTrainSchema)
};
