const DriverState = require('./driverState.service');
const AvailableState = require('./availableState.service');
class BusyState extends DriverState {
  requestRide(driver) {
    console.log('Tài xế đang bận, không thể nhận chuyến mới.');
  }

  completeRide(driver) {
    console.log('Tài xế đã hoàn thành chuyến đi.');
    driver.setState(new AvailableState());
  }

  goOffline(driver) {
    console.log('Không thể ngoại tuyến khi đang có khách.');
  }
}

module.exports = BusyState;
