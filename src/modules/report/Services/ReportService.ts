import { Result, Ok, Err } from 'ts-results'
import Report from '@/report/Models/Report'
import { getPingList } from '@/serviceProvider/cache/ping'
// import { IGetPingList } from '@/serviceProvider/interfaces/ping.interface'
import PingStatus from '@/serviceProvider/Constant/pingStatus'

export default class ReportService  {


    
 
  get = async (body:any): Promise<Result<any, any>> => {
    try {
    const pingList = await getPingList(body.checkId)

    const lastPingStatus: PingStatus = pingList.history[pingList.history.length - 1].status
    const outages = pingList.history.filter((ping:any) => ping.status === PingStatus.DOWN).length
    const ups = pingList.history.filter((ping:any) => ping.status === PingStatus.UP).length
    const uptime = (pingList.check.interval ?? 0) * ups
    const downtime = (pingList.check.interval ?? 0) * outages
    const availability = parseFloat(Number((uptime / (uptime + downtime)) * 100).toFixed(2))
    const averageResponseTime = parseFloat(
      Number(
        pingList.history.map((entry:any) => entry.responseTime).reduce((prev:any, curr:any): number => prev + curr, 0) /
          pingList.history.length
      ).toFixed(2)
    )

    const newReport = {
      status: lastPingStatus,
      ups,
      outages,
      uptime,
      downtime,
      averageResponseTime,
      availability,
      //@ts-ignore
      history: pingList.history,
      timestamp: Date.now(),
      forCheck: pingList.check._id,
    }

    //Create the Report
    const report = await Report.create(newReport)
    if (!report._id) {
      return Err('Error in creating the report')
    }

    return Ok(newReport)
  
} catch (error) {
  return Err('Error in not cheaked yot please wait')
}
  }

}
