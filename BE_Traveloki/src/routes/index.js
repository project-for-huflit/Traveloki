const express = require('express')
const router = express.Router()

router.use("/api", require("./customers/khachHang-routes.js"));

router.use("/api", require("./airports/listAirPlan-routes.js"));

router.use("/api", require("./vehicles/phuongTien-routes.js"));

router.use("/api", require("./maps/tramDung-routes.js"));
router.use("/api", require("./maps/tuyen-routes.js"));

router.use("/api", require("./details/detailCar-routes.js"));

router.use("/api", require("./search/search-routes.js"));

router.use("/api", require("./feedback/appraiseCar-routes.js"));
router.use("/api", require("./feedback/appraiseBus-routes.js"));

router.use("/api", require("./booking/buyTicketTrain-routes.js"));
router.use("/api", require("./booking/buyTicketBus-routes.js"));
router.use("/api", require("./booking/bookingCar-routes.js"));

router.use("/api", require("./history/historyCar-routes.js"));
router.use("/api", require("./history/historyBus-routes.js"));
router.use("/api", require("./history/historyTrain-routes.js"));

router.use("/api", require("./lichChay/lichChay-routes.js"));

router.use("/api", require("./updateState-routes.js"));

router.use("/api", require("./auth/auth.js"))

// ================================================================ 2


// router.use("/api", require("./v1/index.js"))
router.use("/api", require("./v2/index.js"))

module.exports = router
