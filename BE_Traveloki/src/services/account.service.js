'use strict'

const { Account } = require('../models/account.model');

class UserService {
  static findByEmail = async ({
    email,
    select = {
      email: 1,
      password: 2,
      name: 1,
      phone: 1,
      status: 1,
      roles: 1,
    },
  }) => {
    return await Account.findOne({ email }).select(select).lean();
  };
}

module.exports = UserService;
