class BookingHistoryService {
    constructor(model) {
        this.model = model;
    }

    async getAll() {
        return await this.model.find({});
    }

    async create(data) {
        const { MaKH, MaDX } = data;
        if (!MaKH || !MaDX) throw new Error("MaKH và MaDX là bắt buộc");
    
        return await new this.model({ MaKH, MaDX }).save();
    }

    async delete(id) {
        return await this.model.findByIdAndDelete(id);
    }

    async update(id, data) {
        if (!data.Date) throw new Error("Thiếu thông tin Date để cập nhật");
        
        return await this.model.findByIdAndUpdate(
          id,
          { $set: { Date: data.Date } },
          { new: true }
        );
      }
}

module.exports = BookingHistoryService;