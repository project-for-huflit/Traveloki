'use strict';

const { Schema, model } = require('mongoose');

const AccountSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Khach hang phai co ten dang nhap'],
    unique: true,
    minlength: 6,
    maxlength: 30,
  },
  password: {
    type: String,
    required: [true, 'Mat khau khach hang phai co do dai tu 8-30 ky tu'],
    minlength: 8,
    maxlength: 3000,
  },
});

const Account = model('Account', AccountSchema);

module.exports = Account;
