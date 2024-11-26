const { Schema, model, Types } = require('mongoose');

const { DatXeOto } = require("../models/datXeOto.model");


const COLLECTION_NAME = 'LichSuDatXeOtos'

const LichSuDatXeOtoSchema = new Schema({
  MaKH: { type: String, required: true },
  MaDX: { type: String, ref: "DatXeOto" },
  orderID: { type: Types.ObjectId, ref: "DatXeOto" },
  Date: { type: String },
},{
  timestamps: true,
  collection: COLLECTION_NAME
});

LichSuDatXeOtoSchema.pre('save', async function (next) {
  if (this.MaDX) {
    const datXeOto = await DatXeOto.findOne({ MaDX: this.MaDX });
    if (datXeOto) {
      this.orderID = datXeOto._id;
    }
  }
  next();
});

module.exports = {
  LichSuDatXeOto: model("LichSuDatXeOto", LichSuDatXeOtoSchema)
};
