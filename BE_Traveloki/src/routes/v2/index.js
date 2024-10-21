const express = require('express')
const router = express.Router()

const { apiKey, permission } = require('../../services/auth/check.js')

// check apikey
// router.use(apiKey)
// check permissions
// router.use(permission('0000'))

router.use("/v2", require("./auth/user.js"))
router.use("/v2", require("./auth/partner.js"))
router.use("/v2", require("./auth/admin.js"))
router.use("/v2", require("./partner/index.js"))


module.exports = router
