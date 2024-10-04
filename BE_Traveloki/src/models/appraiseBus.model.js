const { Schema, model } = require('mongoose');

const COLLECTION_NAME = 'AppraiseBuses'

const AppraiseBusSchema = new Schema({
  MaBus: { type: String, ref: "PhieuDatXeBus" },
  MaCus: { type: String, ref: "KhachHang" },
  SoSao: { type: Number, require: true },
  NoiDung: { type: String, require: true, maxlength: 500 },
},{
  timestamps: true,
  collection: COLLECTION_NAME
});

const AppraiseBus = model("AppraiseBus", AppraiseBusSchema);

module.exports = {
  AppraiseBus,
};
