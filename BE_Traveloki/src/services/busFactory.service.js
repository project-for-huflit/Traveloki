const VehicleFactory = require('./vehicleFactory.service');
const Bus = require('./bus.service');


class BusFactory extends VehicleFactory {
    //Phương thức khởi tạo xe buýt
    createVehicle(options) {
        return new Bus(options);
    }
}

module.exports = BusFactory;