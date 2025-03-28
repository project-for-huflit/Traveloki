const express = require("express");
const router = express.Router();
const LichSuController =require("../../controllers/historyController");

router.get("/:type", LichSuController.getHistory);
router.post("/:type", LichSuController.createHistory);
router.delete("/:type/:id", LichSuController.deleteHistory);
router.put("/:type/:id", LichSuController.updateHistory);

module.exports = router;
