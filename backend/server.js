import express from 'express'
import mongodb from 'mongoose'
import dotenv from 'dotenv'
import userrouter from './routemanager/userrouter.js'
import busrouter from './routemanager/busrouter.js'
import cookieparser from 'cookie-parser'
import cors from 'cors'
import path from 'path'

const app=express()
dotenv.config()

const __dirname=path.resolve()

app.use(cors())
app.use(express.json({limit:'50mb'}))
app.use(express.urlencoded({extended:true}))
app.use(cookieparser())

app.use('/api/user',userrouter)
app.use('/api/bus',busrouter)

const port=process.env.PORT;
const mongo_uri=process.env.MONGO_URI

mongodb.connect(mongo_uri)

if(process.env.NODE_ENV === "production" )
   {
      app.use( express.static(path.join(__dirname,'/frontend/dist')))
      
      app.get('*',(req,res)=>{
         res.sendFile(path.resolve(__dirname,"frontend","dist","index.html"))
      })
   }
  

app.listen(port,()=>{
   console.log(`Server connected with ${port}`)
})
