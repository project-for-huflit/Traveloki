const { Schema, model } = require('mongoose');

const AccountSchema = new Schema({
  fullName: {
    type: String,
    required: [true, 'Phải có tên người dùng'],
  },
  password: {
    type: String,
    required: [true, 'Phải có Password'],
  },
  email: {
    type: String,
    required: [true, 'Phải có địa chỉ Email'],
    unique: true,
    lowercase: true, // chuyển thành chữ thường
    match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/],
  },
  birthDate: {
    type: Date,
  },
});

const Account = model('Account', AccountSchema);

module.exports = Account;
