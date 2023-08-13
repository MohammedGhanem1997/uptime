import { mailer } from '@/serviceProvider/utils/nodemailer'

export default class EmailNotificationService {
  notify = async (notificationData: any): Promise<void> => {
    mailer.sendMail({
      from: 'mghanem@gmail.com',
      to: notificationData.reciepentData,
      subject: 'Url Down Again',
      text: `Your Url: ${notificationData.pingResult.check.url}${notificationData.pingResult.check.path} is down
      Status: ${notificationData.pingResult.status}
      Response Time: Status: ${notificationData.pingResult.responseTime} `,
    })
  }
}
