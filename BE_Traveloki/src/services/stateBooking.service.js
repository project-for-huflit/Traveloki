'use strict'
const BookingObserver = require('./bookingObserver.service')

class StateBookingService {
    constructor() {
        this.state = 'pending' // Trạng thái mặc định khi booking mới được tạo
    }

    // Hàm thay đổi trạng thái booking
    updateState(newState){
        console.log(`✅ Cập nhật trạng thái booking: ${this.state} ➝ ${newState}`);
        this.state = newState;
        BookingObserver.notify(newState); // Gửi thông báo đến tất cả subscriber
    }

}

module.exports = new StateBookingService();
