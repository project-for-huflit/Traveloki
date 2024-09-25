export const loginUser = {
  body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().email().required()
  })
}

export const forgotPassword = {
  body: Joi.object().keys({
      email: Joi.string().email().required()
  })
}

export const verifyOtp = {
  body: Joi.object().keys({
      email: Joi.string().email().required(),
      otp: Joi.number().integer().required()
  })
}

export const resetPassword = {
  body: Joi.object().keys({
      password: Joi.string().required()
  }),
  query: Joi.object().keys({
      token: Joi.string()
  })
}
