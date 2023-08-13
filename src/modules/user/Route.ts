import { Router } from 'express'

import IRouter from "@/serviceProvider/interfaces/IRouter"
import validationMiddleWare from "@/serviceProvider/middlewares/validation.middleware"
import { signUpSchema, signInSchema, verifySchema } from '@/user/Requests/UserRequest'
import UserController from "@/user/Controllers/UserController"

export default class Route implements IRouter {
    public readonly path = '/users'
    public readonly router = Router()
  
    constructor() {
    
        this.intializeRoutes()
      }
    
      private intializeRoutes(): void {

        this.router.post(`${this.path}/signup`, validationMiddleWare(signUpSchema), UserController.signup)
        this.router.post(`${this.path}/signin`, validationMiddleWare(signInSchema), UserController.signin)
        this.router.post(`${this.path}/verify`, validationMiddleWare(verifySchema), UserController.verify)
      }
}