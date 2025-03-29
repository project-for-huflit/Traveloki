const express = require("express");
const router = express.Router();
const LichSuController =require("../../controllers/historyController");

router.get("/getHistory/:type", LichSuController.getHistory);
router.post("/createHistory/:type", LichSuController.createHistory);
router.delete("/deleteHistory/:type/:id", LichSuController.deleteHistory);
router.put("/updateHistory/:type/:id", LichSuController.updateHistory);

module.exports = router;
