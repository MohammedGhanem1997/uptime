import {  Request, Response, NextFunction } from 'express'
import HttpException from '@/serviceProvider/errors/errors.httpException'
import { signJWT } from '@/serviceProvider/utils/jwt'
import UserService from '@/user/Services/UserServices'

class UserController  {

  

 

  public static signup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const userService = new UserService()
    const data = await userService.signup(req.body)

    if (data.ok) {
      res.status(200).set('token', signJWT(data.val.id)).json({
        message: 'verification mail sent to your mail',
        data: data.val,
      })
    } else next(new HttpException(data.val, 404))
  }

  public  static signin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const userService = new UserService()

    const data = await userService.signin(req.body)

    if (data.ok) {
      let token=  signJWT(data.val.id)
      res.status(200).json({
        data: data.val,
        token
      })
    } else next(new HttpException(data.val, 404))
  }

  public static verify = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const userService = new UserService()

    const data = await userService.verify(req.body)

    if (data.ok) {
      res.status(200).json({
        message: data.val,
      })
    } else next(new HttpException(data.val, 404))
  }
}

export default UserController
