'use strict'

const AppraiseBus = require("../models/schema").AppraiseBus;
const asyncHandler = require('../helpers/asyncHandler')
const { OK, CREATED, SuccessResponse  } = require("../middlewares/success.response")
const { BadRequestError } = require('../middlewares/error.response')

// class AppraiseVehicle { }

// class _AppraiseBus extends AppraiseVehicle { }

// class _AppraiseCar extends AppraiseVehicle { }

// class _AppraiseTrain extends AppraiseVehicle { }

class AppraiseBusController {
  getAppraiseBus = async ( req, res, next ) => {

  }

  createAppraiseBus = async ( req, res, next ) => {

  }

  deleteAppraiseBus = async (req, res, next) => {

  }
}

class AppraiseBusService {
  static async getAppraiseBus() {
    return await AppraiseBus.find({});
  }

  static async createAppraiseBus({ MaBus, MaCus, SoSao, NoiDung }) {
    if (!MaBus || !MaCus || !SoSao || !NoiDung) {
      throw new BadRequestError(`Missing information!`)
    }
    const appraiseBus = new AppraiseBus({
      MaBus, MaCus, SoSao, NoiDung
    });
    return await appraiseBus.save();
  }

  static async deleteAppraiseBus({ MaXe }) {
    if (!MaXe) {
      throw new BadRequestError(`Missing information!`)
    }
  }
}

const GetAppraiseBus = async (req, res) => {
  try {
    const appraiseBus = await AppraiseBus.find({});
    res.status(200).json({ appraiseBus });
  } catch (e) {
    res.status(500).json("not get appraise car");
  }
};

const CreateAppraiseBus = async (req, res) => {
  try {
    const { MaBus, MaCus, SoSao, NoiDung } = req.body;
    if (!MaBus || !MaCus || !SoSao || !NoiDung) {
      return res.status(400).json("Thiếu thông tin");
    }

    const appraiseBus = new AppraiseBus({ MaBus, MaCus, SoSao, NoiDung });
    await appraiseBus.save();
    res.status(200).json({ appraiseBus });
  } catch (e) {
    res.status(500).json("not create appraise car");
  }
};

const DeleteAppraiseBus = async (req, res) => {
  try {
    const { MaXe } = req.body;
    if (!MaXe) {
      return res.status(400).json("Thiếu thông tin");
    }
    await AppraiseBus.deleteOne({ MaXe });
    res.status(200).json("delete appraise car success");
  } catch (e) {
    res.status(500).json("not delete appraise car");
  }
};

module.exports = {
  GetAppraiseBus,
  CreateAppraiseBus,
  DeleteAppraiseBus
};
