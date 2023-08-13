import { Router } from 'express'

import IRouter from "@/serviceProvider/interfaces/IRouter"
import validationMiddleWare from "@/serviceProvider/middlewares/validation.middleware"
import { createCheckSchema } from '@/check/Request/CreateRequest'

import { authenticationMiddleWare } from '@/serviceProvider/middlewares/authentication.middleware'
import CheckController from '@/check/Controllers/CheckControllers'
import { updateCheckSchema } from '@/check//Request/updateCheckSchema'

export default class Route implements IRouter {
    public readonly path = '/checks'
    public readonly router = Router()
  
    constructor() {
    
        this.intializeRoutes()
      }
    
      private intializeRoutes(): void {
        this.router.post(`${this.path}/`, authenticationMiddleWare, validationMiddleWare(createCheckSchema), CheckController.create)
        this.router.get(`${this.path}/:id`, authenticationMiddleWare, CheckController.getOne)
        this.router.patch(
          `${this.path}/:id`,
          authenticationMiddleWare,
          validationMiddleWare(updateCheckSchema),
          CheckController.update
        )
        this.router.delete(`${this.path}/:id`, authenticationMiddleWare, CheckController.delete)
      }
    
}