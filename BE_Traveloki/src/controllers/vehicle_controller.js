const CarFactory = require('../services/carFactory.service');
const BusFactory = require('../services/busFactory.service');
const TrainFactory = require('../services/trainFactory.service');
const {PhuongTien} = require('../models/phuongTien.model'); // Import model PhuongTienModel

const carFactory = new CarFactory();
const busFactory = new BusFactory();
const trainFactory = new TrainFactory();



const CreateTrain = async (req, res) => {
    try {
        const { parternId, MaPT, MaSoXe, TenPhuongTien,  Image, MaSB } = req.body;

        // Tạo phương tiện từ Factory Pattern
        const newVehicle = trainFactory.createVehicle({
            parternId,
            MaPT,
            MaSoXe,
            TenPhuongTien,
            Image,
            MaSB
        });

        // Lưu vào MongoDB
        const savedVehicle = await PhuongTien.create(newVehicle);
        
        res.status(201).json({
            message: "Phương tiện đã được tạo thành công",
            data: savedVehicle
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const CreateCar = async (req, res) => {
    try {
        const { parternId, MaPT, MaSoXe, TenPhuongTien,  Image, MaSB } = req.body;

        // Tạo phương tiện từ Factory Pattern
        const newVehicle = carFactory.createVehicle({
            parternId,
            MaPT,
            MaSoXe,
            TenPhuongTien,
            Image,
            MaSB
        });

        // Lưu vào MongoDB
        const savedVehicle = await PhuongTien.create(newVehicle);
        
        res.status(201).json({
            message: "Phương tiện đã được tạo thành công",
            data: savedVehicle
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}
const CreateBus = async (req, res) => {
    try {
        const { parternId, MaPT, MaSoXe, TenPhuongTien,  Image, MaSB } = req.body;

        // Tạo phương tiện từ Factory Pattern
        const newVehicle = busFactory.createVehicle({
            parternId,
            MaPT,
            MaSoXe,
            TenPhuongTien,
            Image,
            MaSB
        });

        // Lưu vào MongoDB
        const savedVehicle = await PhuongTien.create(newVehicle);
        
        res.status(201).json({
            message: "Phương tiện đã được tạo thành công",
            data: savedVehicle
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    CreateTrain,
    CreateCar,
    CreateBus
};
