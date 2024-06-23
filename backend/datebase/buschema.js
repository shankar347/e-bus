import mongoose from "mongoose";

const mongooseschema=new mongoose.Schema({
   busnumber:{
    type:Number,
    required:true,
   },
   bustype:{
     type:String,
   },
   route:{
    start:{
        type:String,
    },
    destination:{
        type:String,
    },
    stops:[{type:String}]
   },
    timedetails:{
        starttime:{
            type:String,
        },
        endtime:{
            type:String
        }
    },
    currentlocation:{
        type:{
            type:String,
            enum:['Point'],
        },
        coordinates:[{type:Number}]
    }
})

mongooseschema.index({currentlocation:'2dsphere'})

const busmodule=mongoose.model('busdetails',mongooseschema)


export default busmodule;