const BookingHistoryService = require("../services/bookingHistory.service");
const { LichSuDatTau } = require("../models/lichSuDatTau.model");
const { LichSuDatXeOto } = require("../models/lichSuDatXeOto.model");
const { LichSuDatXeBus } = require("../models/lichSuDatXeBus.model");

class BookingHistoryFacade {
  constructor() {
    this.services = {
      tau: new BookingHistoryService(LichSuDatTau),
      oto: new BookingHistoryService(LichSuDatXeOto),
      bus: new BookingHistoryService(LichSuDatXeBus),
    };
  }

  getService(type) {
    const service = this.services[type];
    if (!service) throw new Error("Loại phương tiện không hợp lệ!");
    return service;
  }
}

module.exports = new BookingHistoryFacade();