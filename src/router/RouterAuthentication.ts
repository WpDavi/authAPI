import { Request, Response, Router } from "express";
import * as auth from '../controller/authenticationcontroller'


const router = Router()

 router.post('/auth/register', auth.createUser)
 router.post('/auth/login', auth.login)

 router.post('/claims', auth.createClaims)
 router.get('/claims', auth.readClaims)


export default router;