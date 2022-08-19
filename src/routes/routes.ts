import * as express from 'express'
import { Response,Request } from 'express'
import { User } from '../model/User'
import bcrypt from 'bcrypt'
import  jwt  from 'jsonwebtoken'
import { checkToken } from '../middleware/checkToken'
import userRoutes from './user.routes'
const routes = express.Router()

routes.get('/v1/' , (req: Request, res:Response) => {
    res.sendFile(__dirname,'../../client/home.html')   
})

routes.use('/v1', userRoutes)

export default routes
