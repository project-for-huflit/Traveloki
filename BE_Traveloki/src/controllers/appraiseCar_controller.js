'use strict'

const AppraiseCar = require("../models/schema").AppraiseCar;
const asyncHandler = require('../middlewares/asyncHandler.middeware')
const { OK, CREATED, SuccessResponse  } = require("../middlewares/success.response")

class AppraiseCarController {
  getAppraiseCar = async ( req, res, next ) => {
    try {
      const appraiseCar = AppraiseCarService.getAppraiseCar()
      res.status(200).json({ appraiseCar });
    } catch (e) {
      res.status(500).json("not get appraise car");
    }
  }

  createAppraiseCar = async ( req, res, next ) => {
    try {
      const { MaCar, MaCus, SoSao, NoiDung } = req.body;
      const appraiseCar = AppraiseCarService.createAppraiseCar({ MaCar, MaCus, SoSao, NoiDung })
      await appraiseCar.save();
      res.status(200).json({ appraiseCar });
    } catch (e) {
      res.status(500).json("not create appraise car");
    }
  }

  deleteAppraiseCar = async (req, res, next) => {
    try {
      const { MaXe } = req.body;
      AppraiseCarService.deleteAppraiseCar({ MaXe })
      res.status(200).json("delete appraise car success");
    } catch (e) {
      res.status(500).json("not delete appraise car");
    }
  }
}
// module.exports = new AppraiseCarController()

const GetAppraiseCar = async (req, res) => {
  try {
    const appraiseCar = await AppraiseCar.find({});
    res.status(200).json({ appraiseCar });
  } catch (e) {
    res.status(500).json("not get appraise car");
  }
};

const CreateAppraiseCar = async (req, res) => {
  try {
    const { MaXe, MaKH, Rating, Comment } = req.body;
    if (!MaXe || !MaKH || !Rating || !Comment) {
      return res.status(400).json("Missing information!");
    }
    const appraiseCar = new AppraiseCar({
      MaXe,MaKH,Rating,Comment,
    });
    await appraiseCar.save();
    res.status(200).json({ appraiseCar });
  } catch (e) {
    res.status(500).json("not create appraise car");
  }
};

const DeleteAppraiseCar = async (req, res) => {
  try {
    const { MaXe } = req.body;
    if (!MaXe) {
      return res.status(400).json("Missing information!");
    }
    await AppraiseCar.deleteOne({ MaXe });
    res.status(200).json("delete appraise car success");
  } catch (e) {
    res.status(500).json("not delete appraise car");
  }
};

module.exports = { GetAppraiseCar, CreateAppraiseCar, DeleteAppraiseCar };
