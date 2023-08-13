import { Queue, Worker, Job } from 'bullmq'
import Redis from 'ioredis'
import { axios } from '@/serviceProvider/utils/axios'
import { pushLatestPing } from '@/serviceProvider/cache/ping'
import PingStatus from '@/serviceProvider/Constant/pingStatus'
import { NotificationFactory, NotificationService } from '@/serviceProvider/services/notification'
import EmailNotificationService from '@/serviceProvider/services/emailNotificaion'
 
export default class PingScheduler {
  private static connection = new Redis()
  private static queue: Queue = new Queue('ping', { connection: this.connection })
  private static worker: Worker = new Worker('ping', this.jobHandler)

  public static async addPing(ping: any) {
    try {
      await this.queue.add(ping._id.toString(), ping, {
        repeat: {
          every: ping.interval,
        },
        jobId: ping._id.toString(),
      })
    } catch (error) {}
  }

  public static async deletePing(id: string): Promise<void> {
    try {
      const jobKey = await (
        await this.queue.getRepeatableJobs()
      )
        .filter((entry) => {
          return entry.id === id
        })
        .map((entry) => entry.key)[0]
 
      const job = await this.queue.removeRepeatableByKey(jobKey)
    } catch (error) {}
  }

  private static async jobHandler(job: Job): Promise<void> {
    const check = job.data

    axios({
      method: 'GET',
      baseURL: check.url,
      url: check.path,
      auth: check.authentication,
      timeout: check.timeout,
    })
      .then(async (response) => {
        const responseTime = Number(response.headers['Request-Duration'])
        await pushLatestPing({ check, status: PingStatus.UP, responseTime: responseTime ?? 0, timestamp: Date.now() })
      })
      .catch(async (error) => {
        await pushLatestPing({ check, status: PingStatus.DOWN, responseTime: 0, timestamp: Date.now() })

        //Send Notification for that down
        if (check.email) {
          const notificationService = NotificationFactory.create(EmailNotificationService)
          await notificationService.notify({
            pingResult: { check, status: PingStatus.DOWN, responseTime: 0, timestamp: Date.now() },
            reciepentData: check.email,
          })
        }  if(check.webhook) {
          // webhook notification 
        }
      })
  }
}
