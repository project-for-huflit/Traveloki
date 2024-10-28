'use strict'

const partnerModel = require('../models/partner.model')

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
    return await partnerModel.findOne({ _id }).select(select).lean()
  }
  static findByEmail = async ({ email, select = {
    email: 1,
    password: 2,
    isPartner: 1,
    name: 1,
    phone: 1,
    status: 1
  }}) => {
    return await partnerModel.findOne({ email }).select(select).lean()
  }

  static findOrCreatePartner = async (email) => {
    const existPartner = await DoiTac.findOne({ email })
    if(existPartner) {
      // throw new BadRequestError('Error: Partner already registered!')
      console.log("Partner already registered:", existPartner);
      return existPartner
    } else {
      existPartner = await DoiTac.create({ email })
      console.log("New user created: ", existPartner)
    }

    return existPartner
  }
}


module.exports = PartnerService
