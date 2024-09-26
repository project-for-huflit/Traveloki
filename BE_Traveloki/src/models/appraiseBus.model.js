'use strict'

const { Schema, model } = require('mongoose');

const AppraiseBusSchema = new Schema({
  MaBus: { type: String, ref: "PhieuDatXeBus" },
  MaCus: { type: String, ref: "KhachHang" },
  SoSao: { type: Number, require: true },
  NoiDung: { type: String, require: true, maxlength: 500 },
});

const AppraiseBus = model("AppraiseBus", AppraiseBusSchema);

module.exports = {
  AppraiseBus,
};
