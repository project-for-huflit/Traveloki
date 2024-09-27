const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Account } = require('../models/account.model');

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    // Check username
    const user = await Account.findOne({ username });
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        // Tạo và gửi token JWT về cho client
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
          expiresIn: '2d',
        });
        res.json({ token });
      } else {
        return res.status(401).json({ message: 'Sai mật khẩu' });
      }
    } else {
      return res.status(404).json({ message: 'Tài khoản không tồn tại!!!' });
    }
  } catch (err) {
    console.error('Lỗi đăng nhập:', err);
    res.status(500).json({ message: 'Lỗi server' });
  }
};

const register = async (req, res) => {
  const { username, password } = req.body;
  try {
    // Check tài khoản đã tồn tại hay chưa
    const user = await Account.findOne({ username });
    if (!user) {
      // Mã hóa mật khẩu
      const salt = await bcrypt.genSalt(5);
      password = await bcrypt.hash(password, salt);

      // Lưu newUser
      new Account({
        username,
        password,
      })
        .save()
        .then(() =>
          res.status(200).json({
            status: 'success',
            message: 'Tạo tài khoản thành công',
          })
        )
        .catch((err) => {
          res.status(500).json({
            status: 'fail',
            message: 'Tạo tài khoản thất bại',
            error: err,
          });
        });
    } else {
      return res.status(400).json({ message: 'Tài khoản đã tồn tại!!!' });
    }
  } catch (err) {
    console.error('Lỗi đăng nhập:', err);
    res.status(500).json({ message: 'Lỗi server' });
  }
};
module.exports = { login, register };
