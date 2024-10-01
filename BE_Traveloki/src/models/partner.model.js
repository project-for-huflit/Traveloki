const { Schema, model, Types } = require("mongoose");

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
  servicesActivePartner: {
    type: Array,
    required: true,
    default: []
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
});

module.exports = model('partner', partnerSchema);
