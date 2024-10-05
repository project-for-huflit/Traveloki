const { Schema, model, Types } = require("mongoose");
const COLLECTION_NAME = 'partners'

const partnerSchema = new Schema({
  name: {
    type: String,
    trim: true,
    maxLength: 150
  },
  password: {
    type: String,
    required:true,
  },
  isPartner: {
    type: Boolean,
    require: true,
    default: false
  },
  privateKey: {
    type: String,
  },
  publicKey: {
    type: String,
  },
  status:{
    type: String,
    enum: ['active', 'inactive'],
    default: 'inactive'
  },
  partnerDetail: {
    type: Schema.Types.ObjectId,
    ref: 'detail-partner', // Ref schema partner_detail
  }
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

module.exports = {
  DoiTac: model('partner', partnerSchema)
}
