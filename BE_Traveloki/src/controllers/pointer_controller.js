const { AuthSSOService, AuthJWTService } = require('../services/authen.service')

const { OK, CREATED, SuccessResponse  } = require("../middlewares/success.response")

class PointerController {
  //region JWT
  register = async (req, res, next) => {
    new CREATED({
      message: 'Register OK!',
      metadata: await AuthJWTService.register(req.body),
    }).send(res)
  }
}

module.exports = new PointerController()
