class DriverFactory {
  constructor() {
    this.sharedDataPool = {}; // Lưu dữ liệu chung
  }

  getSharedData(carType, status = 'available') {
    const key = `${carType}-${status}`;

    if (!this.sharedDataPool[key]) {
      this.sharedDataPool[key] = { carType, status };
      console.log(`🆕 Tạo mới Flyweight: ${key}`);
    } else {
      console.log(`♻️ Tái sử dụng Flyweight: ${key}`);
    }
    return this.sharedDataPool[key];
  }
}

module.exports = new DriverFactory();
