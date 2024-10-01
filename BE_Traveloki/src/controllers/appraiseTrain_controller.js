const AppraiseTrain = require("../models/schema").AppraiseTrain;
const asyncHandler = require('../middlewares/asyncHandler.middeware')
const { OK, CREATED, SuccessResponse  } = require("../middlewares/success.response")

class AppraiseTrainController {
  getAppraiseTrain = async ( req, res, next ) => {
    try {
      const appraiseTrain = AppraiseTrainService.getAppraiseTrain()
      res.status(200).json({ appraiseTrain });
    } catch (e) {
      res.status(500).json("not get appraise Train");
    }
  }

  createAppraiseTrain = async ( req, res, next ) => {
    try {
      const { MaTrain, MaCus, SoSao, NoiDung } = req.body;
      const appraiseTrain = AppraiseTrainService.createAppraiseTrain({ MaTrain, MaCus, SoSao, NoiDung })
      await appraiseTrain.save();
      res.status(200).json({ appraiseTrain });
    } catch (e) {
      res.status(500).json("not create appraise Train");
    }
  }

  deleteAppraiseTrain = async (req, res, next) => {
    try {
      const { MaXe } = req.body;
      AppraiseTrainService.deleteAppraiseTrain({ MaXe })
      res.status(200).json("delete appraise Train success");
    } catch (e) {
      res.status(500).json("not delete appraise Train");
    }
  }
}
// module.exports = new AppraiseTrainController()

const GetAppraiseTrain = async (req, res) => {
  try {
    const appraiseTrain = await AppraiseTrain.find({});
    res.status(200).json({ appraiseTrain });
  } catch (e) {
    res.status(500).json("not get appraise Train");
  }
};

const CreateAppraiseTrain = async (req, res) => {
  try {
    const { MaXe, MaKH, Rating, Comment } = req.body;
    if (!MaXe || !MaKH || !Rating || !Comment) {
      return res.status(400).json("Missing information!");
    }
    const appraiseTrain = new AppraiseTrain({
      MaXe,
      MaKH,
      Rating,
      Comment,
    });
    await appraiseTrain.save();
    res.status(200).json({ appraiseTrain });
  } catch (e) {
    res.status(500).json("not create appraise Train");
  }
};

const DeleteAppraiseTrain = async (req, res) => {
  try {
    const { MaXe } = req.body;
    if (!MaXe) {
      return res.status(400).json("Missing information!");
    }
    await AppraiseTrain.deleteOne({ MaXe });
    res.status(200).json("delete appraise Train success");
  } catch (e) {
    res.status(500).json("not delete appraise Train");
  }
};

module.exports = { GetAppraiseTrain, CreateAppraiseTrain, DeleteAppraiseTrain };
