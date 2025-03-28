const Car = require('./car.service');
const VehicleFactory = require('./vehicleFactory.service');

class CarFactory extends VehicleFactory {
    //Phương thức khởi tạo xe hơi
    createVehicle(options) {
        // Tạo một đối tượng Car mới với các thuộc tính được truyền vào từ options
        return new Car(options);
    }
}

module.exports = CarFactory;