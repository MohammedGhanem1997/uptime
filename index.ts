import 'module-alias/register'
import 'dotenv/config'
import App from './app'
import { routes } from '@/serviceProvider/route'
// import IRouter from '@/serviceProvider/interfaces/IRouter'
const app = new App(routes, Number(process.env.PORT))

app.listen()
