import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import path from 'path'

import { mongoConnect } from './database/mongo'
import authRouter from './router/RouterAuthentication'


mongoConnect()

const server = express()
dotenv.config()

server.use(express.static(path.join(__dirname, '../public')));
server.use(express.json())

server.use(authRouter)

server.use((req: Request, res: Response)=>{
    res.status(404).json({msg: 'Pagina não encontrada'}) 
})
server.listen(5000)