const { Schema, model, Types } = require('mongoose');
const COLLECTION_NAME = 'partners';

const partnerSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      maxLength: 150,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: [true, 'Email already exists!'],
    },
    password: {
      type: String,
    },
    isPartner: {
      type: Boolean,
      default: true,
    },
    privateKey: {
      type: String,
    },
    publicKey: {
      type: String,
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'inactive',
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  },
);

module.exports = {
  DoiTac: model('partner', partnerSchema),
};
