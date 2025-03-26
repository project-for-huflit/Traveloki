'use strict';

// Định nghĩa các loại thông báo
const NOTIFICATION_TYPES = {
    BOOKING_SUCCESS: 'BOOKING_SUCCESS',
    SCHEDULE_CHANGE: 'SCHEDULE_CHANGE',
    BOOKING_CANCELLED: 'BOOKING_CANCELLED',
    PAYMENT_SUCCESS: 'PAYMENT_SUCCESS',
    PAYMENT_FAILED: 'PAYMENT_FAILED',
    STATE_CHANGED: 'STATE_CHANGED'
};

// Định nghĩa các loại kênh thông báo
const NOTIFICATION_CHANNELS = {
    EMAIL: 'EMAIL',
    SMS: 'SMS',
    UI: 'UI',
    PUSH: 'PUSH'
};

// Class chính cho Observer Pattern
class BookingObserver {
    constructor() {
        this.observers = new Map(); // Map để lưu observers theo loại thông báo
        this.retryAttempts = 3; // Số lần thử lại khi gửi thông báo thất bại
        this.retryDelay = 1000; // Delay giữa các lần thử (ms)
    }

    // Đăng ký observer cho một loại thông báo cụ thể
    subscribe(notificationType, observer) {
        if (!this.observers.has(notificationType)) {
            this.observers.set(notificationType, new Set());
        }
        this.observers.get(notificationType).add(observer);
    }

    // Hủy đăng ký observer
    unsubscribe(notificationType, observer) {
        if (this.observers.has(notificationType)) {
            this.observers.get(notificationType).delete(observer);
        }
    }

    // Gửi thông báo với retry mechanism
    async notify(notificationType, data) {
        if (!this.observers.has(notificationType)) {
            console.warn(`No observers for notification type: ${notificationType}`);
            return;
        }

        const observers = this.observers.get(notificationType);
        const notification = this.createNotification(notificationType, data);

        for (const observer of observers) {
            await this.sendNotificationWithRetry(observer, notification);
        }
    }

    // Tạo đối tượng thông báo chuẩn hóa
    createNotification(type, data) {
        return {
            type,
            data: {
                ...data,
                timestamp: new Date(),
                notificationId: this.generateNotificationId()
            }
        };
    }

    // Gửi thông báo với cơ chế retry
    async sendNotificationWithRetry(observer, notification, attempt = 1) {
        try {
            await observer.update(notification);
        } catch (error) {
            console.error(`Failed to send notification: ${error.message}`);
            
            if (attempt < this.retryAttempts) {
                console.log(`Retrying... Attempt ${attempt + 1}/${this.retryAttempts}`);
                await new Promise(resolve => setTimeout(resolve, this.retryDelay));
                return this.sendNotificationWithRetry(observer, notification, attempt + 1);
            } else {
                console.error('Max retry attempts reached');
                // Có thể thêm logic xử lý khi đã hết số lần thử
                // Ví dụ: lưu vào queue để xử lý sau
            }
        }
    }

    // Tạo ID duy nhất cho mỗi thông báo
    generateNotificationId() {
        return `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
}

// Base class cho các observers
class BaseNotificationObserver {
    constructor(channel) {
        this.channel = channel;
    }

    async update(notification) {
        throw new Error('Method update() must be implemented');
    }
}

// Concrete observers
class EmailNotificationObserver extends BaseNotificationObserver {
    constructor() {
        super(NOTIFICATION_CHANNELS.EMAIL);
    }

    async update(notification) {
        // TODO: Implement email sending logic
        console.log(`[${this.channel}] Sending email notification:`, notification);
    }
}

class SMSNotificationObserver extends BaseNotificationObserver {
    constructor() {
        super(NOTIFICATION_CHANNELS.SMS);
    }

    async update(notification) {
        // TODO: Implement SMS sending logic
        console.log(`[${this.channel}] Sending SMS notification:`, notification);
    }
}

class UINotificationObserver extends BaseNotificationObserver {
    constructor() {
        super(NOTIFICATION_CHANNELS.UI);
    }

    async update(notification) {
        // TODO: Implement UI update logic
        console.log(`[${this.channel}] Updating UI:`, notification);
    }
}

class PushNotificationObserver extends BaseNotificationObserver {
    constructor() {
        super(NOTIFICATION_CHANNELS.PUSH);
    }

    async update(notification) {
        // TODO: Implement push notification logic
        console.log(`[${this.channel}] Sending push notification:`, notification);
    }
}

// Singleton instance
const bookingObserver = new BookingObserver();

// Đăng ký các observers mặc định
const emailObserver = new EmailNotificationObserver();
const smsObserver = new SMSNotificationObserver();
const uiObserver = new UINotificationObserver();
const pushObserver = new PushNotificationObserver();

// Đăng ký observers cho từng loại thông báo
Object.values(NOTIFICATION_TYPES).forEach(type => {
    bookingObserver.subscribe(type, emailObserver);
    bookingObserver.subscribe(type, smsObserver);
    bookingObserver.subscribe(type, uiObserver);
    bookingObserver.subscribe(type, pushObserver);
});

module.exports = {
    bookingObserver,
    NOTIFICATION_TYPES,
    NOTIFICATION_CHANNELS
}; 