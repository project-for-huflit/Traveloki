class PaymentObserver {
    constructor() {
        this.observers = [];
    }

    // Thêm observer mới
    subscribe(observer) {
        this.observers.push(observer);
    }

    // Xóa observer
    unsubscribe(observer) {
        this.observers = this.observers.filter(obs => obs !== observer);
    }

    // Thông báo cho tất cả observers
    notify(data) {
        this.observers.forEach(observer => observer.update(data));
    }
}

// Concrete Observer cho việc gửi email
class EmailPaymentObserver {
    update(data) {
        // TODO: Implement email sending logic
        console.log('Sending payment email notification:', data);
    }
}

// Concrete Observer cho việc gửi SMS
class SMSPaymentObserver {
    update(data) {
        // TODO: Implement SMS sending logic
        console.log('Sending payment SMS notification:', data);
    }
}

// Concrete Observer cho việc cập nhật UI
class UIPaymentObserver {
    update(data) {
        // TODO: Implement UI update logic
        console.log('Updating payment UI:', data);
    }
}

// Singleton instance
const paymentObserver = new PaymentObserver();

// Thêm các observers mặc định
paymentObserver.subscribe(new EmailPaymentObserver());
paymentObserver.subscribe(new SMSPaymentObserver());
paymentObserver.subscribe(new UIPaymentObserver());

module.exports = paymentObserver; 