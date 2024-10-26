'use strict'

const { DoiTac } = require('../models/partner.model')

const Role = {
  USER: 'USER',
  PARTNER: 'PARTNER',
  ADMIN: 'ADMIN'
}

class PartnerService {

  static getPartnerId = async ({ _id, select = {
    _id: 1,
    email: 1,
    password: 2,
    isPartner: 1,
    name: 1,
    phone: 1,
    status: 1
  }}) => {
    return await DoiTac.findOne({ _id }).select(select).lean()
  }
  static findByEmail = async ({ email, select = {
    email: 1,
    password: 2,
    isPartner: 1,
    name: 1,
    phone: 1,
    status: 1
  }}) => {
    return await DoiTac.findOne({ email }).select(select).lean()
  }

  static findOrCreatePartner = async () => {
    const existPartner = await DoiTac.findOne({ email }).lean()
    if(!existPartner) {
      existPartner = await DoiTac.create({ email })
      console.log("New user created: ", existPartner)
    } else {

    }
  }


}


module.exports = PartnerService
