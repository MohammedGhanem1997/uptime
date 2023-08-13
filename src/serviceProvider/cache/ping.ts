import RedisConnection from '@/connections/redis.connections'

export const pushLatestPing = async (pingResult: any) => {
  const redis = RedisConnection.getClient()

  const result = await redis.rpush(`Ping:checkid#${pingResult.check._id}`, JSON.stringify(pingResult))
}

export const getPingList = async (checkId: string): Promise<any> => {
  try{
  const redis = RedisConnection.getClient()

  const redisResult = await redis.lrange(`Ping:checkid#${checkId}`, 0, -1)

  const pingList: Array<any> = redisResult.map((entry: string): any => {
    const jsonEntry: any = JSON.parse(entry)

    return jsonEntry
  })

  const check: any = pingList[0].check
  const history = pingList.map((ping: any): Pick<any, 'status' | 'responseTime' | 'timestamp'> => {
    return { status: ping.status, responseTime: ping.responseTime, timestamp: ping.timestamp }
  })

  return { check, history }


}catch( error:any){

  return  new Error(error);
   
}
}
