'use strict'

// const { ForbidenError } = require('../../middlewares/error.response')

const HEADER = {
    API_KEY: 'x-api-key',
    AUTHORIZATION: 'authorization'
}

const { findById } = require('../apiKey.service')

const apiKey = async (req, res, next) => {
    try {
        const key = req.headers[HEADER.API_KEY]?.toString()
        if (!key) {
          //  throw new ForbidenError('Forbidden Error')
            return res.status(403).json({
                message: 'Forbidden Error - 18'
            })
        }
        //check objKey
        const objKey = await findById(key)

        if(!objKey){
           //  throw new ForbidenError('Forbidden Error')
            return res.status(403).json({
                message: 'Forbidden Error - 27'
            })
        }
        req.objKey = objKey
        return next()
    } catch (error) { }
}

const permission = ( permission ) => {
    return (req, res, next) => {
        if(!req.objKey.permissions){
            return res.status(403).json({
                message: 'Permission denied'
            })
        }
        console.log(`permissions::`, req.objKey.permissions)

        const validPermission = req.objKey.permissions.includes(permission)
        if(!validPermission){
          //  throw new ForbidenError('Permission denied')
            return res.status(403).json({
                message: 'Permission denied!'
            })
        }
        return next()
    }
}

const checkRole = async (role) => {
  return (req, res, next) => {
    if(req.user.role !== role) {
      // AuthFailureError: 401
      return res.status(401).send(`Not allowed with ${role}`)
    }
    return next()
  }
}

// neu U va P nhan vao chuc nang lien quan toi nghiep vu thi chuyen huong sang dang nhap
const isUserAndPartner = async () => {

}

// Gan quyen admin khi dang ki o dashboard
const isAdmin = async () => {

}

module.exports = {
    apiKey,
    permission,
    checkRole
}
