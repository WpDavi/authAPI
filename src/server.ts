import exppress, { Request, Response } from 'express'
import dotenv from 'dotenv'


import { mongoConnect } from './database/mongo'
import authRouter from './router/RouterAuthentication'

mongoConnect()

const server = exppress()
dotenv.config()
server.use(exppress.json())

server.use(authRouter)

server.use((req: Request, res: Response)=>{
    res.status(404).json({msg: 'Pagina não encontrada'}) 
})
server.listen(5000)