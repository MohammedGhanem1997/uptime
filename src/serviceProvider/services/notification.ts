
export class NotificationFactory {
  public static create<T extends any>(notificationChannel: new () => T): T {
    return new notificationChannel()
  }
}

export class NotificationService {
  private readonly notificationChannel: any

  constructor(notificationChannel: any) {
    this.notificationChannel = notificationChannel
  }

  public async notify(notificationData: any): Promise<void> {
    await this.notificationChannel.notify(notificationData)
  }
}
