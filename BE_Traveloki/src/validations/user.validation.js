const Joi = require('joi')

const loginUser = {
  body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().email().required()
  })
}

const forgotPassword = {
  body: Joi.object().keys({
      email: Joi.string().email().required()
  })
}

const verifyOtp = {
  body: Joi.object().keys({
      email: Joi.string().email().required(),
      otp: Joi.number().integer().required()
  })
}

const resetPassword = {
  body: Joi.object().keys({
      password: Joi.string().required()
  }),
  query: Joi.object().keys({
      token: Joi.string()
  })
}

module.exports = {
  loginUser,
  forgotPassword,
  verifyOtp,
  resetPassword
}
