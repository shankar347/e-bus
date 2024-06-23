import express from 'express'
import { loginuser, logoutuser, registeruser, updateuser } from '../routehandler.js/userroutes.js';
import authuser from '../middelwares/authuser.js';


const router =express.Router()

router.post('/',registeruser);
router.post('/login',loginuser)
router.put('/',authuser,updateuser)
router.get('/',logoutuser)

export default router;