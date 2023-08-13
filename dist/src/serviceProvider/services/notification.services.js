"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationService = exports.NotificationFactory = void 0;
class NotificationFactory {
    static create(notificationChannel) {
        return new notificationChannel();
    }
}
exports.NotificationFactory = NotificationFactory;
class NotificationService {
    constructor(notificationChannel) {
        this.notificationChannel = notificationChannel;
    }
    async notify(notificationData) {
        await this.notificationChannel.notify(notificationData);
    }
}
exports.NotificationService = NotificationService;
