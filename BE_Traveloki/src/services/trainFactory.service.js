const Train = require('./train.service');
const VehicleFactory = require('./vehicleFactory.service');

class TrainFactory extends VehicleFactory {
    //Phương thức khởi tạo xe lửa
    createVehicle(options) {
        // Tạo một đối tượng Train mới với các thuộc tính được truyền vào từ options
        return new Train(options,LoaiPT="Train",SoGheToiDa=1000);
    }
}

module.exports = TrainFactory;