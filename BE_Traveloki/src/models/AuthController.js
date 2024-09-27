const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Account } = require('../Schema/schema');

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    // Tìm người dùng trong database
    const user = await Account.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'Sai Tài khoản' });
    }
    // So sánh mật khẩu
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Sai mật khẩu' });
    }
    // Tạo và gửi token JWT về cho client
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '2d',
    });
    res.json({ token });
  } catch (error) {
    console.error('Lỗi đăng nhập:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
};
module.exports = { login };
