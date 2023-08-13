import userRoute  from '@/user/Route' 
import checkRoute from '@/check/Route'

import reportRoute from '@/report/Route'
 import IRouter from '@/serviceProvider/interfaces/IRouter'
export const routes:IRouter[] = [
  new userRoute(),
  new checkRoute(),
  new reportRoute(),
]
