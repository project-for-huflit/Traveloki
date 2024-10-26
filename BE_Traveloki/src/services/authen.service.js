'use strict'
// lib
require('dotenv').config()
const { PointerStrategy } = require("sso-pointer");
const crypto = require('node:crypto');
const bcrypt = require('bcrypt')
// const { type } = require("node:os");
// const { format } = require("node:path");

// depenc...
const { DoiTac } = require('../models/partner.model')
const { Account } = require('../models/account.model')
const { BadRequestError, ForbidenError, AuthFailureError, NotFoundError } = require('../middlewares/error.response')
const UserService = require('./account.service')
const PartnerService = require('./partner.service')
const KeyTokenService = require('./keyToken.service')
const { getInfoData } = require('../utils/')
const { createTokenPair, getAccessToken, getUserProfile } = require('./auth/utils');

const Role = {
  USER: 'USER',
  PARTNER: 'PARTNER',
  ADMIN: 'ADMIN'
}

const SECRET_POINTER = process.env.SECRET_KEY_POINTER

class  AuthJWTService {

  static handleRefreshToken = async ({ keyStore, user, refreshToken }) => {

    const { userId, email } = user

    if(keyStore.refreshTokensUsed.includes(refreshToken)) {
      await KeyTokenService.deleteKeyById( userId )
      throw new ForbidenError('Something wrong happened, please relogin!')
    }

    if(keyStore.refreshToken !== refreshToken) throw new AuthFailureError('Shop is not registered!')

    //check userId
    const foundShop = await findByEmail( { email } )
    if(!foundShop) throw new AuthFailureError('Shop is not registered - found')

    // create new pair
    const tokens = await createTokenPair({userId: userId, email}, keyStore.publicKey, keyStore.privateKey)

    //update token
    await keyStore.updateOne({
      $set: {
        refreshToken: tokens.refreshToken
      },
      $addToSet: {
        refreshTokensUsed: refreshToken // is used to take new token
      }
    })
    return { user, tokens }
  }

  static register = async ({ name, email, password }) => {
    try {
      const modelUser = await Account.findOne({ email }).lean()
      if (modelUser) throw new BadRequestError('Error: User already registered!')

      const passwordHash = await bcrypt.hash(password, 10)

      const newUser = await Account.create({
        name, email, password: passwordHash, phone, roles: [Role.USER]
      })

      if (newUser) {
        const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
          modulusLength: 2048,
          publicKeyEncoding: { type: "pkcs1", format: "pem" },
          privateKeyEncoding: { type: "pkcs1", format: "pem" }
        })

        console.log({ privateKey, publicKey })

        const publicKeyString = await KeyTokenService.createKeyTokenForUser({
          userId: newUser._id,
          publicKey,
          privateKey
        })

        if (!publicKeyString) {
          return {
            code: 'xxx',
            message: 'publicKeyString error!'
          }
        }
        console.log(`publicKeyString::`, publicKeyString)

        const publicKeyObject = crypto.createPublicKey(publicKeyString)
        console.log(`publicKeyObject::`, publicKeyObject)

        const tokens = await createTokenPair({ userId: newUser._id, email }, publicKeyObject, privateKey)
        console.log(`created tokens success!::`, tokens)

        return {
          code: 201,
          metadata: {
            user: getInfoData({ fields: ['_id', 'name', 'email'], object: newUser }),
            tokens
          }
        }
      }
      return {
        code: 200,
        metadata: null
      }
    } catch (error) {
      return {
        code: 'xxx',
        message: error.message,
        status: 'error'
      }
    }
  }

  static login = async ({ email, password, refreshToken = null }) => {

    const foundUser = await UserService.findByEmail({ email })
    if(!foundUser) throw new BadRequestError('User not registered!')

    const match = bcrypt.compare( password, foundUser.password )
    if(!match) throw new AuthFailureError('Authentication error!')

    const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
      modulusLength: 2048,
      publicKeyEncoding: {
        type: "pkcs1",
        format: "pem"
      },
      privateKeyEncoding: {
        type: "pkcs1",
        format: "pem"
      }
    })

    const { _id: userId } = foundUser
    const tokens = await createTokenPair({userId: userId, email}, publicKey, privateKey)

    await KeyTokenService.createKeyTokenForUser({
      refreshToken: tokens.refreshToken,
      userId: userId,
      privateKey,
      publicKey
    })

    return {
      user: getInfoData({ fields: ['_id', 'name', 'email'], object: foundUser }),
      tokens
    }
  }

  static logout = async ( keyStore ) => {
    const delKey = await KeyTokenService.removeKeyById( keyStore._id )
    console.log({delKey})
    return delKey
  }
}

class AuthSSOService {
  static async handleRefreshToken({ keyStore, user, refreshToken }) {
    const { userId, email } = user

    if(keyStore.refreshTokensUsed.includes(refreshToken)) {
      await KeyTokenService.deleteKeyById( userId )
      throw new ForbidenError('Something wrong happened, please relogin! - line 39')
    }

    if(keyStore.refreshToken !== refreshToken) throw new AuthFailureError('Partner is not registered! - line 42')

    const foundPartner = await PartnerService.findByEmail({ email })
    if(!foundPartner) throw new AuthFailureError('Shop is not registered - line 45')

    const tokens = await createTokenPair({
      userId: userId, email
    }, keyStore.publicKey, keyStore.privateKey)

    // update tokens
    await keyStore.updateOne({
      $set: {
        refreshToken: tokens.refreshToken
      },
      $addToSet: {
        refreshTokensUsed: refreshToken // is used to take new token
      }
    })

    return {
      user,
      tokens
    }
  }
  /**
   * @LOQ-burh
   * @steps
   * @1 - check email in dbs
   * @2 - hash password
   * @2 - create new partner
   * @3 - create assetToken & refreshToken and save
   * @4 - generate token
   * @5 - get data return login
   * @route (update later)
   * @param (update later)
   * @body (update later)
   * @returns partner
   * @returns tokens pair: access token, refresh token
   */
  static async register({ name, email, password }) {
    try {
      // - 1
      const existPartner = await DoiTac.findOne({ email }).lean()
      if(existPartner) throw new BadRequestError('Error: Partner already registered! - line 85')

      const passHash = await bcrypt.hash(password, 10)

      const newPartner = await DoiTac.create({
        name, email, password: passHash, isPartner: true
      })

      if(newPartner) {
        const {privateKey, publicKey} = crypto.generateKeyPairSync('rsa', {
          modulusLength: 2048,
          publicKeyEncoding: { type: "pkcs1", format: "pem" },
          privateKeyEncoding: { type: "pkcs1", format: "pem" }
        })
        console.log({privateKey, publicKey})
        // console.log(
        //   publicKey.export({ type: "pkcs1", format: "pem" }),
        //   privateKey.export({ type: "pkcs1", format: "pem" })
        // )

        const publicKeyString = await KeyTokenService.createKeyTokenForPartner({
          partnerId: newPartner._id,
          publicKey,
          privateKey
        })
        if(!publicKeyString) {
          return {
            code: 'xxx',
            message: 'publicKeyString error! - line 113'
          }
        }
        console.log(`publicKeyString::`, publicKeyString)

        const publicKeyObject = crypto.createPublicKey(publicKeyString)
        console.log(`publicKeyObject::`, publicKeyObject)

        // create tokens pair
        const tokens = await createTokenPair({ partnerId: newPartner._id, email }, publicKeyObject, privateKey)
        console.log(`create tokens pair success::`, tokens)

        return {
          code: 201,
          metadata: {
            partner: getInfoData({fields: ['_id', 'name', 'email'], object: newPartner}),
            tokens
          }
        }
      }
    } catch (error) {
      return {
        code: 'xxx',
        message: error.message,
        status: 'error'
      }
    }
  }
  /**
   * @LOQ-burh
   * @steps
   * @1 - check email in dbs
   * @2 - match password
   * @3 - create assetToken & refreshToken and save
   * @4 - generate token
   * @5 - get data return login
   * @route (update later)
   * @param (update later)
   * @body (update later)
   * @returns partner
   * @returns tokens pair: access token, refresh token
   */
  static async login({ email, password, refreshToken = null }) {
    const foundPartner = await PartnerService.findByEmail({ email })
    if(!foundPartner) throw new BadRequestError('Partner not registered!')

    const match = bcrypt.compare( password, foundPartner.password )
    if(!match) throw new AuthFailureError('Authen error!')

    const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
      modulusLength: 2048,
      publicKeyEncoding: {
        type: "pkcs1",
        format: "pem"
      },
      privateKeyEncoding: {
        type: "pkcs1",
        format: "pem"
      }
    })
    const { _id: partnerId } = foundPartner
    const tokens = await createTokenPair({partnerId: partnerId, email}, publicKey, privateKey)

    await KeyTokenService.createKeyTokenForPartner({
      refreshToken: tokens.refreshToken,
      partnerId: partnerId,
      privateKey,
      publicKey
    })

    return {
      partner: getInfoData({ fields: ['_id', 'name', 'email'], object: foundPartner }),
      tokens
    }
  }
  static async loginWithPointer(code) {
    if(!code) throw new NotFoundError('Authorization code is required!')

    const getPartnerId = await PartnerService.findByEmail({ email })
    if(!getPartnerId) throw new BadRequestError('Partner not registered!')

    // const pointer = new PointerStrategy({ apiKey: "" });

    // // 1. get access token
    // const getAccessToken = async () => {
    //   try {
    //     const rs = await pointer.getAccessToken("dd34c58f8000a0e4e573e8eb");
    //     console.log(rs);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
    // const { accessToken } = getAccessToken();

    // const verifyToken = async () => {
    //   try {
    //     const rs = await pointer.verifyAccessToken({
    //       accessToken: accessToken,
    //       // Synchronizes login sessions between apps but increases response time
    //       session: false, //option
    //     });
    //     console.log(rs);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
    // verifyToken();

    // const getAT = await pointer.getAccessToken(code);
    // const parter = await pointer.getUser(getAT.accessToken);
    try {
      const AT = await getAccessToken(code)
      const user = await getUserProfile(AT)

      // 3. check if isUser, if user isn't exist then create profile
      // const isUser = await

      // 4. create token jwt
    } catch (error) {

    }

    // 2. get user profile from access token

    // 3. find or create user with emaill from user profile

    // 4. create token jwt for user

    // 5. send response infor user and token

    // const userId = user?._id;
    // if (!userId) throw new BadRequestError('User ID not found in user data');

    //Sau khi lấy thông tin người dùng thì xử lý theo nghiệp vụ của app
    // const foundPartner = await PartnerService.findByEmail({ email: parter._id })
    // if(!foundPartner) throw new BadRequestError('Parter is not registered!')

    // const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
    //   modulusLength: 2048,
    //   publicKeyEncoding: {
    //     type: "pkcs1",
    //     format: "pem"
    //   },
    //   privateKeyEncoding: {
    //     type: "pkcs1",
    //     format: "pem"
    //   }
    // })

    // // tao cap tokens
    // const { _id: userId } = foundPartner
    // const tokens = await createTokenPair({userId: userId, email}, publicKey, privateKey)

    // await KeyTokenService.createKeyToken({
    //   refreshToken: tokens.refreshToken,
    //   userId: userId,
    //   privateKey,
    //   publicKey
    // })

    return {
      getAT,
      parter
    }
  }
  static logout = async ( keyStore ) => {
    const delKey = await KeyTokenService.removeKeyById( keyStore._id )
    console.log({delKey})
    return delKey
  }
}

module.exports = {
  AuthJWTService,
  AuthSSOService
}

