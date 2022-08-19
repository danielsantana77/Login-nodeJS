import * as express from 'express'
import { Response,Request } from 'express'
import { User } from '../model/User'
import bcrypt from 'bcrypt'
import  jwt  from 'jsonwebtoken'
import { checkToken } from '../middleware/checkToken'
import { UserController } from '../controllers/UserController'

const userRoutes = express.Router()

userRoutes.post('/auth/register', new UserController().register)
userRoutes.post('/auth/login', new UserController().login)
userRoutes.get('/user/:id',checkToken, new UserController().findId)
userRoutes.get('/users', new UserController().findUsers)

export default userRoutes
