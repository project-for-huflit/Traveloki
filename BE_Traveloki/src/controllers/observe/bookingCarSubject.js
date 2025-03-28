const CustomerNotification = require("./customerNotification");
const AdminNotification = require("./adminNotification");

class BookingCarSubject {
  constructor() {
    this.observers = [];
    this.isInitialized = false;
  }

  addObserver(observer) {
    this.observers.push(observer);
  }

  removeObserver(observer) {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  notifyObservers(data) {
    this.observers.forEach((observer) => observer.update(data));
  }

  initializeObservers() {
    if (!this.isInitialized) {
      this.addObserver(new CustomerNotification());
      this.addObserver(new AdminNotification());
      this.isInitialized = true;
    }
  }
}

const bookingCarSubject = new BookingCarSubject();
bookingCarSubject.initializeObservers();

module.exports = bookingCarSubject;
