const DriverState = require('./driverState.service');

class OfflineState extends DriverState {
  requestRide(driver) {
    console.log("Tài xế đang ngoại tuyến, không thể nhận chuyến.");
  }

  completeRide(driver) {
    console.log("Không thể hoàn thành chuyến đi khi đang ngoại tuyến.");
  }

  goOffline(driver) {
    console.log("Tài xế đã ngoại tuyến.");
  }
}

module.exports = OfflineState;