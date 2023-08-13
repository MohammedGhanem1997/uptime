import {  Request, Response, NextFunction } from 'express'
import HttpException from '@/serviceProvider/errors/errors.httpException'
import ReportService from '@/report/Services/ReportService'

class ReportController  {


  private intializeRoutes(): void {
  }

  public static getOne = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
         const reportService :ReportService =new ReportService()
    const data = await reportService.get({ checkId: req.params.checkId, userId: res.locals.userId })

    if (data.ok) {
      res.status(200).json({
        message: 'Report created',
        data: data.val,
      })
    } else next(new HttpException(data.val, 400))
  }
}

export default ReportController
