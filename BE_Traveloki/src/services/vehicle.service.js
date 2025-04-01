    class Vehicle {
    constructor({ parternId, MaPT, MaSoXe, TenPhuongTien, Image, MaSB }) {
        if (new.target === Vehicle) {
            throw new Error("Không thể khởi tạo đối tượng từ lớp Vehicle");
        }

        this.parternId = parternId; // Mã đối tác (ObjectId)
        this.MaPT = MaPT; // Mã phương tiện
        this.MaSoXe = MaSoXe; // Mã số xe
        this.TenPhuongTien = TenPhuongTien; // Tên phương tiện
        this.Image = Image; // Hình ảnh phương tiện
        this.MaSB = MaSB; // Mã sân bay (ObjectId)
    }

    info() {
        throw new Error("Phương thức info() phải được triển khai trong lớp con")
    }


   
}

module.exports = Vehicle;