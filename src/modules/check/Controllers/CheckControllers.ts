import {  Request, Response, NextFunction } from 'express'
import HttpException from '@/serviceProvider/errors/errors.httpException'
import CheckService from '@/check/Services/CheckServices'

class CheckController   {
 
  public static  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const checkService = new CheckService

    const data = await checkService.create(req.body, res.locals.userId)

    if (data.ok) {
      res.status(200).json({
        message: 'Check created',
        data: data.val,
      })
    } else next(new HttpException(data.val, 400))
  }

  public static getOne = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const checkService = new CheckService

    const data = await checkService.getOne({ checkId: req.params.id, userId: res.locals.userId })

    if (data.ok) {
      res.status(200).json({
        message: 'Check found',
        data: data.val,
      })
    } else next(new HttpException(data.val, 404))
  }

  public static update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const checkService = new CheckService

    const data = await checkService.update({ checkId: req.params.id, userId: res.locals.userId, ...req.body })
    if (data.ok) {
      res.status(200).json({
        message: 'Check updated',
        data: data.val,
      })
    } else next(new HttpException(data.val, 404))
  }

  public static delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const checkService = new CheckService

    const data = await checkService.delete({ checkId: req.params.id, userId: res.locals.userId })

    if (data.ok) {
      res.status(204).json({
        message:"record has been deleted"
      })
    } else next(new HttpException(data.val, 404))
  }
}

export default CheckController
