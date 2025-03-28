

class  VehicleFactory {
   //VehicleFactory chứa phương thức khởi tạo xe trừu tượng (abstract)
   createVehicle() {
    throw new Error("Phương thức createVehicle() phải được triển khai trong lớp con");
   }
}

module.exports = VehicleFactory;