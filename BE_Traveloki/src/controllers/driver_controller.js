const Driver = require("../services/driver.service");
const DriverModel = require("../models/driver.model");

// Import các trạng thái
const AvailableState = require("../services/availableState.service");
const BusyState = require("../services/busyState.service");
const OfflineState = require("../services/offlineState.service");

const addDriver = async (req, res) => {
  try {
    const { name, phone, address, carType } = req.body;

    // Tạo tài xế mới với dữ liệu chia sẻ
    const driver = new Driver(name, phone, address, carType);
    await driver.saveToDB();

    res.status(200).json({ message: "Tài xế đã được thêm thành công!", driver });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getDrivers = async (req, res) => {
  try {
    const drivers = await DriverModel.find();
    res.json(drivers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getStateInstance = (stateName) => {
  switch (stateName) {
    case "available":
      return new AvailableState();
    case "busy":
      return new BusyState();
    case "offline":
      return new OfflineState();
    default:
      return new AvailableState();
  }
};

const updateState = async (req, res) => {
  try {
    const { phone, action } = req.body;

    // Tìm tài xế theo số điện thoại
    const driverData = await DriverModel.findOne({ phone });

    if (!driverData) {
      return res.status(404).json({ message: "Tài xế không tồn tại!" });
    }

    // Tạo đối tượng Driver từ dữ liệu database
    const driver = new Driver(
      driverData.name,
      driverData.phone,
      driverData.address,
      driverData.carType
    );

    // Lấy state từ database
    const currentState = getStateInstance(driverData.state);
    driver.setState(currentState);

    let message;

    switch (action) {
      case "requestRide":
        driver.state.requestRide(driver);
        message = "Tài xế đã nhận chuyến đi!";
        break;
      case "completeRide":
        driver.state.completeRide(driver);
        message = "Tài xế đã hoàn thành chuyến đi!";
        break;
      case "goOffline":
        driver.state.goOffline(driver);
        message = "Tài xế đã chuyển sang trạng thái offline!";
        break;
      default:
        return res.status(400).json({ message: "Hành động không hợp lệ!" });
    }

    // Cập nhật trạng thái vào database
    await DriverModel.updateOne({ phone }, { state: driver.getStatus() });

    res.status(200).json({ message, driverStatus: driver.getStatus() });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi cập nhật trạng thái!", error: error.message });
  }
};

module.exports = {
  addDriver,
  getDrivers,
  updateState,
};
