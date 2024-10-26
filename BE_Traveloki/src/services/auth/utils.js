'use strict'

const JWT = require('jsonwebtoken')

const asyncHandler  = require('../../middlewares/asyncHandler.middeware')
const KeyTokenService = require('../keyToken.service')
const { AuthFailureError, NotFoundError } = require('../../middlewares/error.response')

const HEADER = {
  API_KEY: 'x-api-key',
  CLIENT_ID: 'x-client-id',
  AUTHORIZATION: 'authorization',
  REFRESHTOKEN: 'refreshtoken'
}

const createTokenPair = async ( payLoad, publicKey, privateKey ) => {
    try {
        const accessToken = await JWT.sign( payLoad, privateKey, {
            algorithm: 'RS256',
            expiresIn: '2 days'
        })

        const refreshToken = await JWT.sign( payLoad, privateKey, {
            algorithm: 'RS256',
            expiresIn: '7 days'
        })

        JWT.verify( accessToken, publicKey, (err, decode) => {
            if(err){
                console.error(`error verify::`, err)
            } else{
                console.log(`decode verify::`, decode)
            }
        })
        return { accessToken, refreshToken }
    } catch (error) {

    }
}

const authenticationUser = asyncHandler(async (req, res, next) => {
  /*
  1 - Check userId missing??
  2 - get accessToken
  3 - verifyToken
  4 - check user in db
  5 - check keyStore with this userId
  6 - OK all?? return next
  */

  // 1.
  const userId = req.headers[HEADER.CLIENT_ID]
  if (!userId) throw new AuthFailureError('Invalid Request! - line 53')

  // 2.
  const keyStore = await KeyTokenService.findByUserId( userId )
  if (!keyStore) throw new NotFoundError('Not found keyStore!')

  // 3.
  if(req.headers[HEADER.REFRESHTOKEN]){
    try {
      const refreshToken = req.headers[HEADER.REFRESHTOKEN]
      const decodeUser = JWT.verify( refreshToken, keyStore.privateKey )

      if(userId !== decodeUser.userId) throw new AuthFailureError('Invalid userId!')

      req.keyStore = keyStore
      req.user = decodeUser
      req.refreshToken = refreshToken

      return next()

    } catch (error) {
      throw error
    }
  }
  const accessToken = req.headers[HEADER.AUTHORIZATION]
  if (!accessToken) throw new AuthFailureError('Invalid Request!')

  try {
    const decodeUser = JWT.verify( accessToken, keyStore.publicKey )

    if(userId !== decodeUser.userId) throw new AuthFailureError('Invalid userId!')

    req.keyStore = keyStore
    req.user = decodeUser // { userId, email }

    return next()

  } catch (error) {
    throw error
  }
})

// const authenticationAdmin = asyncHandler(async (req, res, next) => {
//   /*
//   1 - Check userId missing??
//   2 - get accessToken
//   3 - verifyToken
//   4 - check user in db
//   5 - check keyStore with this userId
//   6 - OK all?? return next
//   */

//   // 1.
//   const userId = req.headers[HEADER.CLIENT_ID]
//   if (!userId) throw new AuthFailureError('Invalid Request!')

//   // 2.
//   const keyStore = await KeyTokenService.findByUserId( userId )
//   if (!keyStore) throw new NotFoundError('Not found keyStore!')

//   // 3.
//   if(req.headers[HEADER.REFRESHTOKEN]){
//     try {
//       const refreshToken = req.headers[HEADER.REFRESHTOKEN]
//       const decodeUser = JWT.verify( refreshToken, keyStore.privateKey )

//       if(userId !== decodeUser.userId) throw new AuthFailureError('Invalid userId!')

//       req.keyStore = keyStore
//       req.user = decodeUser
//       req.refreshToken = refreshToken

//       return next()

//     } catch (error) {
//       throw error
//     }
//   }
//   const accessToken = req.headers[HEADER.AUTHORIZATION]
//   if (!accessToken) throw new AuthFailureError('Invalid Request!')

//   try {
//     const decodeUser = JWT.verify( accessToken, keyStore.publicKey )

//     if(userId !== decodeUser.userId) throw new AuthFailureError('Invalid userId!')

//     req.keyStore = keyStore
//     req.user = decodeUser // { userId, email }

//     return next()

//   } catch (error) {
//     throw error
//   }
// })

const authenticationPartner = asyncHandler(async (req, res, next) => {
  /*
  1 - Check userId missing??
  2 - get accessToken
  3 - verifyToken
  4 - check user in db
  5 - check keyStore with this userId
  6 - OK all?? return next
  */

  // 1.
  const partnerId = req.headers[HEADER.CLIENT_ID]
  if (!partnerId) throw new AuthFailureError('Invalid Request!')

  // 2.
  const keyStore = await KeyTokenService.findByPartnerId( partnerId )
  if (!keyStore) throw new NotFoundError('Not found keyStore!')

  // 3.
  if(req.headers[HEADER.REFRESHTOKEN]){
    try {
      const refreshToken = req.headers[HEADER.REFRESHTOKEN]
      const decodePartner = JWT.verify( refreshToken, keyStore.privateKey )

      if(partnerId !== decodePartner.partnerId) throw new AuthFailureError('Invalid PartnerId!')

      req.keyStore = keyStore
      req.partner = decodePartner
      req.refreshToken = refreshToken

      return next()

    } catch (error) {
      throw error
    }
  }
  const accessToken = req.headers[HEADER.AUTHORIZATION]
  if (!accessToken) throw new AuthFailureError('Invalid Request!')

  try {
    const decodePartner = JWT.verify( accessToken, keyStore.publicKey )

    if(partnerId !== decodePartner.partnerId) throw new AuthFailureError('Invalid PartnerId!')

    req.keyStore = keyStore
    req.partner = decodePartner // { partnerId, email }

    return next()

  } catch (error) {
    throw error
  }
})

const verifyJWT = async ( token, keySecret ) => {
  return await JWT.verify( token, keySecret )
}

const { PointerStrategy } = require("sso-pointer");
const pointer = new PointerStrategy({ apiKey: "" });
const getAccessToken = async (code) => {
  try {
    const { accessToken } = await pointer.getAccessToken(code);
    return accessToken
  } catch (error) {
    throw new Error('Failed to get access token!')
  }
}

const getUserProfile = async (accessToken) => {
  try {
    const userProfile = await pointer.verifyAccessToken({
      accessToken,
      // Synchronizes login sessions between apps but increases response time
      session: false, //option
    });

    if (!userProfile || !userProfile.email) { throw new NotFoundError('Invalid user profile') }
    return userProfile
  } catch (error) {
    throw new Error('Failed to get user profile!')
  }
}

module.exports = {
    createTokenPair,
    authenticationUser,
    // authenticationAdmin,
    authenticationPartner,
    verifyJWT,
    getAccessToken,
    getUserProfile
}
