const { Schema, model } = require('mongoose');
const COLLECTION_NAME = 'SanBays'

const SanBaySchema = new Schema({
  MaSB: {
    type: String,
    required: true,
    maxlength: 5,
  },
  TenSanBay: {
    type: String,
    required: true,
    maxlength: 100,
  },
  ThanhPho:{
    type: String,
    required: true,
    maxlength: 100,
  }
},{
  timestamps: true,
  collection: COLLECTION_NAME
});

module.exports = {
  SanBay: model("SanBay", SanBaySchema)
};
