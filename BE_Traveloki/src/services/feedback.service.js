'use strict'

class AppraiseCarService {
  static async getAppraiseCar() {
    return await AppraiseCar.find({});
  }

  static async createAppraiseCar({ MaCar, MaCus, SoSao, NoiDung }) {
    if (!MaCar || !MaCus || !SoSao || !NoiDung) {
      throw new BadRequestError(`Missing information!`)
    }
    const appraiseCar = new AppraiseCar({
      MaCar, MaCus, SoSao, NoiDung
    });
    return await appraiseCar.save();
  }

  static async deleteAppraiseCar({ MaXe }) {
    if (!MaXe) {
      throw new BadRequestError(`Missing information!`)
    }

    await AppraiseCar.deleteOne({ MaXe });
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

    await AppraiseBus.deleteOne({ MaXe });
  }
}

class AppraiseTrainService {
  static async getAppraiseTrain() {
    return await AppraiseTrain.find({});
  }

  static async createAppraiseTrain({ MaTrain, MaCus, SoSao, NoiDung }) {
    if (!MaTrain || !MaCus || !SoSao || !NoiDung) {
      throw new BadRequestError(`Missing information!`)
    }
    const appraiseTrain = new AppraiseTrain({
      MaTrain, MaCus, SoSao, NoiDung
    });
    return await appraiseTrain.save();
  }

  static async deleteAppraiseTrain({ MaXe }) {
    if (!MaXe) {
      throw new BadRequestError(`Missing information!`)
    }

    await AppraiseTrain.deleteOne({ MaXe });
  }
}
