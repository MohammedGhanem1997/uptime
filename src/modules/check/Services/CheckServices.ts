import { Result, Ok, Err } from 'ts-results'
import Check from '@/check/Models/Check'
import Report from '@/report/Models/Report'
import PingScheduler from '@/serviceProvider/schedulers/ping'

export default class CheckService  {
  create = async (body:any, userId: string): Promise<Result<any, string>> => {

    try {
      
   
    const isCheckAlreadyExist = await Check.exists({ url: body.url })

    //Check is already exist
    if (isCheckAlreadyExist?._id) {
      return Err('Check already exists')
    }

    const check: any = await Check.create({ ...body, createdBy: userId })

    if (check._id) {
      //Push the check to the PingQueue


      await PingScheduler.addPing(check)

      //Create Inital Report
      const report = await Report.create({
        status: 'up',
        availability: 0,
        outages: 0,
        downtime: 0,
        uptime: 0,
        averageResponseTime: 0,
        history: [{}],
        timestamp: Date.now(),
        forCheck: check._id,
      })

      return Ok(check)
    } else return Err('Error in creating check')

  } catch (error :any) {
    return Err(error)
  }
  }

  getOne = async (body: any): Promise<Result<any, string>> => {
    const check: any | null = await Check.findOne({ _id: body.checkId, createdBy: body.userId }, { __v: false })

    if (check == null) {
      return Err('Check not found')
    }
    return Ok(check)
  }

  update = async (body: any): Promise<Result<any, string>> => {

    try {
      
   
    const check: any | null = await Check.findOneAndUpdate({ _id: body.checkId, createdBy: body.userId }, body)

    if (check == null) {
      return Err('Check not found')
    }

    //Delete the old check from the ping scheduler
    await PingScheduler.deletePing(body.checkId)

    // Get the new data
    //@ts-ignore
    const newcheck: any = await Check.findOne({ _id: body.checkId, createdBy: body.userId }, { __v: false })

    //Then add the new one
    await PingScheduler.addPing(newcheck)

    return Ok(newcheck)
   } catch (error :any) {
      return Err(error)
    }
  }

  delete = async (body:any): Promise<Result<true, string>> => {
    try{
    const check: any | null = await Check.findOneAndDelete({ _id: body.checkId, createdBy: body.userId })

    if (check == null) {
      return Err('Check not found')
    }

    await PingScheduler.deletePing(body.checkId)

    return Ok(true)
  
} catch (error :any) {
  return Err(error)
}
  }
}
