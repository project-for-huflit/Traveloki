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
}


module.exports = PartnerService
