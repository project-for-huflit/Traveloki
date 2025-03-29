const AvailableState = require('./availableState.service');
class Driver {
    constructor(name, phone, address, carType) {
        this.name = name;
        this.phone = phone;
        this.address = address;
        this.carType = carType;
        this.state = new AvailableState(); // Mặc định là trạng thái sẵn sàng
      }
    
    // Lưu tài xế vào database
    async saveToDB() {
        const DriverModel = require('../models/driver.model');
        const driver = new DriverModel({
            name: this.name,
            phone: this.phone,
            address: this.address,
            carType: this.carType,
        })
        return await driver.save();
    }

    setState(state) {
        this.state = state;
    }

    completeRide() {
        this.state.completeRide(this);
    }

    goOffline() {
        this.state.goOffline(this);
    }

    getStatus() {
        return this.state.constructor.name // Trả về tên lớp của trạng thái hiện tại
    }
}

module.exports = Driver;

