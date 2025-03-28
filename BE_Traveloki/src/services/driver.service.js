class Driver {
    constructor(name, phone, address, carType, sharedData) {
        this.name = name;
        this.phone = phone;
        this.address = address;
        this.sharedData = sharedData;
    }

    
    // Lưu tài xees vào database
    async saveToDB() {
        const DriverModel = require('../models/driver.model');
        const driver = new DriverModel({
            name: this.name,
            phone: this.phone,
            location: this.location,
            sharedData: this.sharedData
        })
        return await driver.save();
    }
}

module.exports = Driver;

