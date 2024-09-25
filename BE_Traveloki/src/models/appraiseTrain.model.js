'use strict'

const { Schema, model } = require('mongoose');

const AppraiseTrainSchema = new mongoose.Schema({
  MaTau: { type: String, ref: "PhieuDatTau" },
  MaCus: { type: String, ref: "KhachHang" },
  SoSao: { type: Number, required: true },
  NoiDung: { type: String, required: true, maxlength: 500 },
});

const AppraiseTrain = mongoose.model("AppraiseTrain", AppraiseTrainSchema);

module.exports = {
  AppraiseTrain,
};
