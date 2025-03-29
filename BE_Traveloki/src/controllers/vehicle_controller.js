const CarFactory = require('../services/carFactory.service');
const BusFactory = require('../services/busFactory.service');
const TrainFactory = require('../services/trainFactory.service');
const {PhuongTien} = require('../models/phuongTien.model'); // Import model PhuongTienModel

const carFactory = new CarFactory();
const busFactory = new BusFactory();
const trainFactory = new TrainFactory();

const createVehicle = async (req, res) => {
    try {
        const { parternId, MaPT, LoaiPT, MaSoXe, TenPhuongTien, SoGheToiDa, Image, MaSB } = req.body;

        let factory;
        switch (LoaiPT.toLowerCase()) {
            case 'car':
                factory = carFactory;
                break;
            case 'bus':
                factory = busFactory;
                break;
            case 'train':
                factory = trainFactory;
                break;
            default:
                return res.status(400).json({ message: "Loại phương tiện không hợp lệ" });
        }

        // Tạo phương tiện từ Factory Pattern
        const newVehicle = factory.createVehicle({
            parternId,
            MaPT,
            LoaiPT,
            MaSoXe,
            TenPhuongTien,
            SoGheToiDa,
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
    createVehicle
};
