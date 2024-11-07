const { Account } = require('../models/account.model');

const getAccount = async (req, res) => {
  try {
    const users = await Account.find(req.params);
    res.json({
      status: 'success',
      results: users.length,
      data: { users },
    });
  } catch (err) {
    res.status(404).json({ status: 'fail', message: err.message });
  }
};

module.exports = getAccount;
