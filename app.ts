import express, { Application } from 'express'
import helmet from 'helmet'
import compression from 'compression'
import cors from 'cors'
import morgan from 'morgan'
import errorMiddleware from '@/serviceProvider/middlewares/error.middleware'
import MongoConnection from '@/connections/mongo.connections'
import RedisConnection from '@/connections/redis.connections'
import '@/serviceProvider/schedulers/ping'
import IRouter from '@/serviceProvider/interfaces/IRouter'

/**
 * App Class: Bootstrap our server and intialise all required steps to start the server
 */
export default class App {
  private express: Application
  private port: number

  constructor(routes:IRouter[], port: number) {
    this.express = express()
    this.port = port
  
    this.intialiseMongoConnection()
    this.intialiseRedisConnection()
    this.initialiseMiddlewares()
    this.initialiseRoutes(routes)
    this.intialiseErrorHandling()
  }

  /**
   * method used for intialising all global middlewares
   */
  private initialiseMiddlewares() {
    this.express.use(helmet())
    this.express.use(cors())
    this.express.use(compression())
    this.express.use(morgan('dev'))
    this.express.use(express.json())
    this.express.use(express.urlencoded({ extended: false }))
  }

  /**
   * Intialise all the controllers by looping through the routers of each controller and passes it to express
   * @param controllers - Array of controllers for all modules
   */
  private initialiseRoutes(routes:IRouter[]) {
    routes.forEach((route:IRouter) => {
      this.express.use('/api/v1', route.router)
    })
  }

  /**
   * Intialise express global error handling middleware, Accepts HttpExecption from controllers and response it to the client side
   */
  private intialiseErrorHandling() {
    this.express.use(errorMiddleware)
  }

  private intialiseMongoConnection() {
    const mongo=MongoConnection.connect()

    console.log("mongo conected",mongo);
    
  }

  private intialiseRedisConnection() {
    RedisConnection.connect()
  }

  /**
   * Start listening the express server on the predefined port
   */
  public listen() {
    this.express.listen(this.port, () => {
      console.log(`App running on port: ${this.port}`)
    })
  }
}
