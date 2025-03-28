const Driver = require('../services/driver.service');
const DriverFactory = require('../services/DriverFactory.service');

const addDriver = async (req, res) => {
    try {
        const { name, phone, location, carType } = req.body;

        // Lấy dữ liệu chia sẻ từ Flyweight Factory
        const sharedData = DriverFactory.getSharedData(carType);

        // Tạo tài xế với dữ liệu chia sẻ
        const driver = new Driver(name, phone, location, sharedData);
        await driver.saveToDB();

        res.json({ message: " Driver added successfully", driver });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getDrivers = async (req, res) => {
     try {
        const DriverModel = require("../models/driver");
        const drivers = await DriverModel.find();
        res.json(drivers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    addDriver,
    getDrivers
};