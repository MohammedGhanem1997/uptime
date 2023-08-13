"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_utils_1 = require("@/shared/utils/nodemailer.utils");
class EmailNotificationService {
    constructor() {
        this.notify = async (notificationData) => {
            nodemailer_utils_1.mailer.sendMail({
                from: 'mghanem@gmail.com',
                to: notificationData.reciepentData,
                subject: 'Url Down Again',
                text: `Your Url: ${notificationData.pingResult.check.url}${notificationData.pingResult.check.path} is down
      Status: ${notificationData.pingResult.status}
      Response Time: Status: ${notificationData.pingResult.responseTime} `,
            });
        };
    }
}
exports.default = EmailNotificationService;
