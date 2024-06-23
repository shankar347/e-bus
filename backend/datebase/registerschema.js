
import  mongoose from 'mongoose'

const regeisterschema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
   
    isdriver:{
        type:Boolean,
        required:true,
        default:false
    },
    city:{
        type:String
    }

},{timestamps:true})


const registermodel= mongoose.model('Users',regeisterschema)

export default registermodel
