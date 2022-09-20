import { connect } from "mongoose";
import dotenv from 'dotenv'

dotenv.config();

export const mongoConnect = async ()=>{
    
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS

    try {
        console.log('connectando ao banco de dados')
        await connect(process.env.MONGO_URL as string)
        console.log('MongoDB connectado')
    } catch (error) {
        console.log('Erro Conexão MongoDB,', Error)
        
    }
}