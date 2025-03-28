const Observer = require("./observer.js");

class AdminNotification extends Observer {
  update(data) {
    console.log("Thông báo đến Admin:", data.message);
    // Gửi WebSocket
  }
}

module.exports = AdminNotification;
