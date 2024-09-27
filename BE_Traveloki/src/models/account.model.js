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
    validate: {
      validator: (pass) => {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/.test(
          pass
        );
      },
      message:
        'Mat khau phai co it nhat 1 ky tu in hoa, 1 so ky tu dac biet va do dai tu 8-30 ky tu',
    },
  },
});

const Account = model('Account', AccountSchema);

module.exports = Account;
