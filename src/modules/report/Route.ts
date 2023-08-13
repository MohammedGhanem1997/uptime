import { Router } from 'express'

import IRouter from "@/serviceProvider/interfaces/IRouter"
import { authenticationMiddleWare } from '@/serviceProvider/middlewares/authentication.middleware'
import ReportController from "@/report/Controllers/ReportController"

export default class Route implements IRouter {
    public readonly path = '/reports'
    public readonly router = Router()
  
    constructor() {
    
        this.intializeRoutes()
      }
    
      private intializeRoutes(): void {

        this.router.get(`${this.path}/:checkId`, authenticationMiddleWare, ReportController.getOne)

      }
}