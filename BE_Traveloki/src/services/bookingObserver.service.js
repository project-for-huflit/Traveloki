class BookingObserver {
  constructor() {
    this.subscribers = []; // Danh sách các subscribers sẽ nhận được thông báo khi trạng thái thay đổi
  }

  // Đăng ký một subscriber mới vào danh sách
  subscribe(subscriber) {
    this.subscribers.push(subscriber);
  }

   // Thông báo cho tất cả subscriber về trạng thái mới
   notify(state) {
    console.log(`Thông báo: Trạng thái booking đã thay đổi thành ${state}`);
    this.subscribers.forEach(subscriber => subscriber.update(state));
  }
}


module.exports = new BookingObserver();