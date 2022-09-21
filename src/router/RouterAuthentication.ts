import { Request, Response, Router } from "express";
import multer from "multer";



import * as auth from '../controller/authenticationcontroller'

const upload = multer({
    dest:'./tmp',
    fileFilter:(req, file, cb)=>{
        const allowed: string[] = ['image/jpg', 'image/jpeg', 'image/png'] 

        if(allowed.includes(file.mimetype)) {
            cb(null, true);
        }else {
            cb(null, false)
        }
    }
})


const router = Router()

 router.post('/auth/register', auth.createUser)
 router.post('/auth/login', auth.login)

 router.post('/claims', auth.createClaims)
 router.get('/claims', auth.readClaims)
 router.get('/claims/:_id', auth.readOneClaims)
 router.put('/claims/:_id', auth.changeClaims)
 router.delete('/claims/:_id', auth.deletClaims)

 router.post('/uploud', upload.single('avatar'), auth.uploadFille)


export default router;