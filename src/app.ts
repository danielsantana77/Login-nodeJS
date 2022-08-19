import express, { json } from 'express'
import routes from './routes/routes';
import morgan from 'morgan'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'

import { createServer } from './database/server';

dotenv.config()

const app = express()
app.use(morgan('dev'))
app.use(express.json())

app.use(routes)
createServer(app)
