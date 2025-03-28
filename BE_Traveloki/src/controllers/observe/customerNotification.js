const Observer = require("./observer.js");

class CustomerNotification extends Observer {
  update(data) {
    console.log("Thông báo đến khách hàng:", data.message);
    // Gửi WebSocket
  }
}

module.exports = CustomerNotification;
