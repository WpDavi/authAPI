import { Request, Response } from "express";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import modelUser from '../model/modelUser'
import modelClaims from '../model/modelClaims'
import dotenv from 'dotenv'

dotenv.config()

export const createUser = async (req: Request, res: Response)=>{
    const { name, email, password, confirmpassword } = req.body

    if (!name) {
        return res.status(422).json({msg: 'O nome é obrigatório'})
    }
    if (!email) {
        return res.status(422).json({msg: 'O email é obrigatório'})
    }
    if (!password) {
        return res.status(422).json({msg: 'A senha é obrigatório'})
    }
    if (password != confirmpassword) {
        return res.status(422).json({msg: 'As senhas nao conferem'})
    }
    
    const userExists = await modelUser.findOne({email: email})

    if(userExists) {
        return res.status(422).json({msg:'E-mail já cadastrado'})
    }

    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)

    const user = new modelUser({
        name,
        email,
        password: passwordHash
    })

    try {
        await user.save()

        res.status(201).json({msg:'Usuário criado com sucesso!'})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({msg: error})
        
    }
}

export const login = async (req: Request, res: Response)=>{
    const { email, password} = req.body

    if(!email){
        return res.status(202).json({msg: 'email obrigatorio!'})
    }
    if(!password) {
        return res.status(202).json({msg: 'Password obrigatorio'})
    }

    const user = await modelUser.findOne({email: email})
    
    if (!user) {
        return res.status(422).json({msg: 'usuario nao encontrado'})
    }

    const checkPassword = await bcrypt.compare(password, user.password)

    if(!checkPassword) {
       return res.status(201).json({msg: 'senha incorreta'})
    }
    
    try {
        

        const token = jwt.sign(
            {
                id: user._id,
            },
            process.env.SECRET as string,
        )
        res.status(200).json({msg: 'deu certo', token})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg: error})
        
    }
    
}

export const createClaims = async (req: Request, res: Response)=>{
    const { reason, message  } = req.body

   if(!reason) {
    return res.status(404).json({msg: 'O motivo e obrigatorio'})
   }
   if(!message) {
    return res.status(404).json({msg: 'A reclamação e obrigatoria'})
   }

   const claims = new modelClaims({
    reason,
    message
   })

   try {
    let newClaims = await claims.save()

    res.status(201).json({id: newClaims._id, reason, message})
   } catch (error) {
    console.log(error)
    res.status(500).json({msg: error})
    
   }
    
}

export const readClaims = async (req:Request, res: Response)=>{

    let list = await modelClaims.find();
    res.json({list})
}

export const readOneClaims = async (req:Request, res: Response)=>{
    let id = await req.params._id
    
    let complaint = await modelClaims.findById(id)

    if(complaint) {
        res.json({complaint})
    }else{
        res.json({error: 'frase nao encontrada'})
    }
    
}

export const changeClaims = async(req: Request, res: Response)=>{
    const id = req.params._id
    const { reason, message } = req.body
    
    const person = {
        reason,
        message
    }

    try {

        const update = await modelClaims.updateOne({id}, person)
        res.json({msg: 'mecher nesse codigo amanha'})

        
    } catch (error) {
        
    }


}