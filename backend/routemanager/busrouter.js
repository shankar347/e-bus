import express from 'express'
import { createbusroute, getallbuses, getbus, getlatestbus, updatelocation } from '../routehandler.js/busroutes.js'
import authuser from '../middelwares/authuser.js'

const router=express.Router()

router.post('/',authuser,createbusroute)
router.get('/allbuses',authuser,getallbuses)
router.get('/latest',authuser,getlatestbus)
router.get('/:start?/:destination?/',authuser,getbus)
router.patch('/:id/location',authuser,updatelocation)


export default router