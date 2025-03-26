// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const {Account} = require('../models/account.model');

const {
  AuthSSOService,
  AuthJWTService,
  AuthJWTServiceStrategy,
  AuthSSOServiceStrategy
} = require('../services/authen.service');

const {
  OK,
  CREATED,
  SuccessResponse,
} = require('../middlewares/success.response');

const authStrategyMiddleware = require('../middlewares/authStrategy.middleware');
class AuthController {
  //region JWT
  register = async (req, res, next) => {
    new CREATED({
      message: 'Register OK!',
      metadata: await AuthJWTService.register(req.body),
    }).send(res);
  };

  login = async (req, res, next) => {
    new SuccessResponse({
      metadata: await AuthJWTService.login(req.body),
    }).send(res);
  };

  logout = async (req, res, next) => {
    new SuccessResponse({
      message: 'Logout success!',
      metadata: await AuthJWTService.logout(req.keyStore),
    }).send(res);
  };
  handlerRefreshTokenUser = async (req, res, next) => {
    new SuccessResponse({
      message: 'Get token success!',
      metadata: await AuthJWTService.handleRefreshToken({
        refreshToken: req.refreshToken,
        user: req.user,
        keyStore: req.keyStore,
      }),
    }).send(res);
  };
  // region POINTER SERVICE

  loginPartner = async (req, res, next) => {
    new SuccessResponse({
      metadata: await AuthSSOService.login(req.body),
    }).send(res);
  };
  loginPointer = async (req, res, next) => {
    new SuccessResponse({
      message: ' success!',
      metadata: await AuthSSOService.loginWithPointer(req.body),
    }).send(res);
  };

  logoutPointer = async (req, res, next) => {
    new SuccessResponse({
      message: 'Logout with partner success!',
      metadata: await AuthSSOService.logout(req.keyStore),
    }).send(res);
  };

  registerPointer = async (req, res, next) => {
    new CREATED({
      message: 'Register with pointer OK!',
      metadata: await AuthSSOService.register(req.body),
    }).send(res);
  };

  handlerRefreshTokenPointer = async (req, res, next) => {
    new SuccessResponse({
      message: 'Get token success!',
      metadata: await AuthSSOService.handleRefreshToken({
        refreshToken: req.refreshToken,
        user: req.user,
        keyStore: req.keyStore,
      }),
    }).send(res);
  };
}

class AuthControllerStrategy {
  // registerJWT = async (req, res, next) => {
  //   new CREATED({
  //     message: 'Register OK!',
  //     metadata: await AuthJWTServiceStrategy.register(req),
  //   }).send(res);
  // };

  // loginJWT = async (req, res, next) => {
  //   new SuccessResponse({
  //     metadata: await AuthJWTServiceStrategy.login(req),
  //   }).send(res);
  // };

  // loginPointer = async (req, res, next) => {
  //   new SuccessResponse({
  //     message: ' success!',
  //     metadata: await AuthSSOServiceStrategy.login(req),
  //   }).send(res);
  // };

  // registerPointer = async (req, res, next) => {
  //   new CREATED({
  //     message: 'Register with pointer OK!',
  //     metadata: await AuthSSOServiceStrategy.register(req),
  //   }).send(res);
  // };

  // authStrategyMiddleware = async (req, res, next) => {
  //   new SuccessResponse({
  //     message: 'Register with pointer OK!',
  //     metadata: await AuthSSOServiceStrategy.register(req),
  //   }).send(res);
  // };
  login = async (req, res, next) => {
    new SuccessResponse({
      metadata: await req.authContext.login(req)
    }).send(res);
  };

  register = async (req, res, next) => {
    new CREATED({
      message: 'Register OK!',
      metadata: await req.authContext.register(req),
    }).send(res);
  };
}
module.exports = {
  AuthController: new AuthController(),
  AuthControllerStrategy: new AuthControllerStrategy()
};

// const login = async (req, res, next) => {
//   const { username, password } = req.body;
//   try {
//     // Check username
//     const user = await Account.findOne({ username });
//     if (user) {
//       const isMatch = await bcrypt.compare(password, user.password);
//       if (isMatch) {
//         // Tạo và gửi token JWT về cho client
//         const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//           expiresIn: '2d',
//         });
//         res.json({ token });
//       } else {
//         return res.status(401).json({ message: 'Password incorrect!' });
//       }
//     } else {
//       return res.status(404).json({ message: 'Account is not exist!!!' });
//     }
//     // if (!user) {
//     //   throw new NotFoundError(`Tài khoản không tồn tại!!!`)
//     // }

//     // const isMatch = await bcrypt.compare(password, user.password);

//     // if (isMatch) {
//     //   throw new AuthFailureError(`Sai mật khẩu`)
//     // }

//     // // Tạo và gửi token JWT về cho client
//     // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//     //   expiresIn: '2d',
//     // });

//     // res.json({ token });
//     next();
//   } catch (err) {
//     console.error('login error:', err);
//     res.status(500).json({ message: 'Error server!' });
//   }
// };

// const register = async (req, res, next) => {
//   const { username, password } = req.body;
//   console.log(password);
//   try {
//     // Check tài khoản đã tồn tại hay chưa
//     const user = await Account.findOne({ username });
//     if (!user) {
//       // Mã hóa mật khẩu
//       const salt = await bcrypt.genSalt(10);
//       const hashedPassword = await bcrypt.hash(password, salt);
//       // Lưu newUser
//       const newUser = new Account({
//         username,
//         password: hashedPassword,
//       });
//       await newUser
//         .save()
//         .then(() =>
//           res.status(200).json({
//             status: 'success',
//             message: 'Tạo tài khoản thành công',
//           })
//         )
//         .catch((err) => {
//           res.status(500).json({
//             status: 'fail',
//             message: 'Tạo tài khoản thất bại',
//             error: err,
//           });
//         });
//     } else {
//       return res.status(400).json({ message: 'Account is exist!!!' });
//     }
//     next();
//   } catch (err) {
//     console.error('Register error: ', err);
//     res.status(500).json({ message: 'Error server' });
//   }
// };

// module.exports = { login, register };
