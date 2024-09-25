'use strict'

const express = require('express')
const router = express.Router()

//================= DEMO ==================================
// router.use('/v1/api/discount', require('./discount'))
// router.use('/v1/api/checkout', require('./checkout'))
// router.use('/v1/api/cart', require('./cart'))
// router.use('/v1/api/product', require('./product'))
// router.use('/v1/api', require('./access'))
//=========================================================

router.use("/api", require("./khachHang-routes.js"));
router.use("/api", require("./listAirPlan-routes.js"));
router.use("/api", require("./vehicles/phuongTien-routes.js"));
router.use("/api", require("./maps/tramDung-routes.js"));
router.use("/api", require("./maps/tuyen-routes.js"));
router.use("/api", require("./detailCar-routes.js"));
router.use("/api", require("./search/search-routes.js"));
router.use("/api", require("./AppraiseCarRoute.js"));
router.use("/api", require("./AppraiseBusRoute.js"));
router.use("/api", require("./BuyTicketTrainRoute.js"));
router.use("/api", require("./BuyTicketBusRoute.js"));
router.use("/api", require("./BookingCarRoute.js"));
router.use("/api", require("./HistoryCar.js"));
router.use("/api", require("./HistoryBusRoute.js"));
router.use("/api", require("./HistoryTrainRoute.js"));
router.use("/api", require("./updateState-routes.js"));

module.exports = router
