    class Vehicle {
    constructor({ parternId, MaPT, LoaiPT, MaSoXe, TenPhuongTien, SoGheToiDa, Image, MaSB }) {
        if (new.target === Vehicle) {
            throw new Error("Không thể khởi tạo đối tượng từ lớp Vehicle");
        }

        this.parternId = parternId; // Mã đối tác (ObjectId)
        this.MaPT = MaPT; // Mã phương tiện
        this.LoaiPT = LoaiPT; // Loại phương tiện (bus, train)
        this.MaSoXe = MaSoXe; // Mã số xe
        this.TenPhuongTien = TenPhuongTien; // Tên phương tiện
        this.SoGheToiDa = SoGheToiDa; // Số ghế tối đa
        this.Image = Image; // Hình ảnh phương tiện
        this.MaSB = MaSB; // Mã sân bay (ObjectId)
    }

    info() {
        throw new Error("Phương thức info() phải được triển khai trong lớp con")
    }


   
}

module.exports = Vehicle;