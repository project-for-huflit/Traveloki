'use strict';

const { Types } = require('mongoose')

const token = require('../services/auth/utils')
const keyTokenModel = require('../models/keyToken.model')
const { BadRequestError } = require('../middlewares/error.response')

class KeyTokenService {
  static async createKey(type, id, refreshToken) {
    switch (type) {
      case 'partner':
        return await keyTokenModel.create({
          refreshToken: refreshToken,
          partnerID: id,
        })
      case 'user':
        return await keyTokenModel.create({
          refreshToken: refreshToken,
          userID: id,
        })
      case 'admin':
        return await keyTokenModel.create({
          refreshToken: refreshToken,
          adminID: id,
        })
      default:
        throw new BadRequestError('Type not defined!');
    }
  }

  static findByUserId = async ( userId ) => {
    return await keyTokenModel.findOne({ userId: new Types.ObjectId(userId) })
  }

  static findByPartnerId = async ( partnerId ) => {
    return await keyTokenModel.findOne({ partnerId: new Types.ObjectId(partnerId) })
  }

  static findByAdminId = async ( adminId ) => {
    return await keyTokenModel.findOne({ adminId: new Types.ObjectId(adminId) })
  }

  static removeKeyById = async ( id ) => {
    return await keyTokenModel.deleteOne( id )
  }

  static createKeyTokenForUser = async ({ userId, publicKey, privateKey, refreshToken }) => {
    try {
      const filter = { userId: userId },
            update = { publicKey, privateKey, refreshTokensUsed: [], refreshToken },
            options = { upsert: true, new: true }

      const tokens = await keyTokenModel.findOneAndUpdate(filter, update, options)

      return tokens ? tokens.publicKey : null
    } catch (error) {
      return error
    }
  }
  static createKeyTokenForPartner = async ({ partnerId, publicKey, privateKey, refreshToken }) => {
    try {
      const filter = { partnerId: partnerId },
            update = { publicKey, privateKey, refreshTokensUsed: [], refreshToken },
            options = { upsert: true, new: true }

      const tokens = await keyTokenModel.findOneAndUpdate(filter, update, options)

      return tokens ? tokens.publicKey : null
    } catch (error) {
      return error
    }
  }
  static createKeyTokenForAdmin = async ({ adminId, publicKey, privateKey, refreshToken }) => {
    try {
      const filter = { adminId: adminId },
            update = { publicKey, privateKey, refreshTokensUsed: [], refreshToken },
            options = { upsert: true, new: true }

      const tokens = await keyTokenModel.findOneAndUpdate(filter, update, options)

      return tokens ? tokens.publicKey : null
    } catch (error) {
      return error
    }
  }
  // Tao cap AT, RT

  // Tim RT
  static findByRefreshTokenUsed = async ( refreshToken ) => {
    return await keyTokenModel.findOne( { refreshTokensUsed: refreshToken } ).lean()
  }

  static findByRefreshToken = async ( refreshToken ) => {
    return await keyTokenModel.findOne( { refreshToken } )
  }
  // cap nhat RT

  // Xoa RT
  static deleteKeyById = async ( userId ) => {
    return await keyTokenModel.deleteOne( { user: new Types.ObjectId(userId) } )
  }
}

module.exports = KeyTokenService;
