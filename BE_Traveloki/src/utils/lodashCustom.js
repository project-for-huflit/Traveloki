'use strict'

// _.pick
/**
 ** {exp}
 * const _ = require('lodash')

   const getInfoData = ({ fields = [], object = {} }) => {
       return _.pick( object, fields)
   }
 */

import pick from './.internal/pick'


const getInfoData = ({ fields = [], object = {} }) => {
    return pick( object, fields )
}

module.exports = {
  getInfoData,
}
