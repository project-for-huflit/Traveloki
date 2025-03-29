const {
  AuthJWTServiceStrategy,
  AuthSSOServiceStrategy,
  AuthContext
} = require('../services/authen.service');
// const AuthContext = reuire("./AuthContext");

const authStrategyMiddleware = async (req, res, next) => {
  try {
    const authType = req.headers["auth-type"]; // (JWT or SSO)

    let strategy;
    if (authType === "jwt") {
      strategy = new AuthJWTServiceStrategy();
    } else if (authType === "sso") {
      strategy = new AuthSSOServiceStrategy();
    } else {
      throw new Error("Invalid authentication type");
    }

    const authContext = new AuthContext(strategy);
    req.authContext = authContext;
    next();
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

module.exports = authStrategyMiddleware;
