'use strict'

const { ApiKey } = require("../models/apikey.model")
const crypto = require('node:crypto');

class ApiKeyService {
  static async createApiKey(code) {
    return await ApiKey.create({
      key: crypto.randomBytes(64).toString('hex'),
      permissions: [code]
    })
  }

  static async findById( key ) {
    // const newKey0000 = await ApiKey.create({key: crypto.randomBytes(64).toString('hex'),permissions: ['0000']})
    // console.log(newKey0000)
    const objKey = await ApiKey.findOne({ key, status: true }).lean()
    return objKey
}
}

module.exports = ApiKeyService
