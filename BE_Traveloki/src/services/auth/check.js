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

module.exports = {
    apiKey,
    permission
}
