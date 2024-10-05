const { AppraiseBus } = require("../models/appraiseBus.model");
const asyncHandler = require('../middlewares/asyncHandler.middeware')
const { OK, CREATED, SuccessResponse  } = require("../middlewares/success.response")
const { BadRequestError } = require('../middlewares/error.response')

// class AppraiseVehicle { }

// class _AppraiseBus extends AppraiseVehicle { }

// class _AppraiseCar extends AppraiseVehicle { }

// class _AppraiseTrain extends AppraiseVehicle { }

class AppraiseBusController {
  getAppraiseBus = async ( req, res, next ) => {
    try {
      const appraiseBus = AppraiseBusService.getAppraiseBus()
      res.status(200).json({ appraiseBus });
    } catch (e) {
      res.status(500).json("not get appraise bus");
    }
  }

  createAppraiseBus = async ( req, res, next ) => {
    try {
      const { MaBus, MaCus, SoSao, NoiDung } = req.body;
      const appraiseBus = AppraiseBusService.createAppraiseBus({ MaBus, MaCus, SoSao, NoiDung })
      await appraiseBus.save();
      res.status(200).json({ appraiseBus });
    } catch (e) {
      res.status(500).json("not create appraise bus");
    }
  }

  deleteAppraiseBus = async (req, res, next) => {
    try {
      const { MaXe } = req.body;
      AppraiseBusService.deleteAppraiseBus({ MaXe })
      res.status(200).json("delete appraise bus success");
    } catch (e) {
      res.status(500).json("not delete appraise bus");
    }
  }
}
// module.exports = new AppraiseBusController()

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
      return res.status(400).json("Missing information!");
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
      return res.status(400).json("Missing information!");
    }
    await AppraiseBus.deleteOne({ MaXe });
    res.status(200).json("Delete appraise car success");
  } catch (e) {
    res.status(500).json("Can not delete appraise car");
  }
};

module.exports = {
  GetAppraiseBus,
  CreateAppraiseBus,
  DeleteAppraiseBus
};
