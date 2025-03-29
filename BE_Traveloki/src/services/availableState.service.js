const DriverState = require('./driverState.service');
const BusyState = require('./busyState.service');
const OfflineState = require('./offlineState.service');

class AvailableState extends DriverState {
  requestRide(driver) {
    console.log('Tài xế nhận chuyến đi.');
    driver.setState(new BusyState());
  }

  completeRide(driver) {
    console.log('Không thể hoàn thành chuyến đi khi chưa có khách.');
  }

  goOffline(driver) {
    console.log('Tài xế đã ngoại tuyến.');
    driver.setState(new OfflineState());
  }
}

module.exports = AvailableState;
