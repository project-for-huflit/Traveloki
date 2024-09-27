'use strict';

const { Schema, model } = require('mongoose');

const partnerSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      maxLength: 150,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
      default: null,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: [true, 'Email already exists!'],
    },
    password: {
      type: String,
      required: true,
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
  }
);
module.exports = model('partner', partnerSchema);
