import registermodel from "../datebase/registerschema.js"
import bcrypt  from 'bcryptjs'
import generatetoken from "../middelwares/generatejwt.js"

const registeruser=async(req,res)=>{
    try
    {

     const user= await registermodel.findOne({email:req.body.email})

     if(user)
        {
         return res.json({error:'User is already existing'})
        }

     const salt=bcrypt.genSaltSync(10)
     const hashedpassword=bcrypt.hashSync(req.body.password,salt)
     
     const newuser=await registermodel.create({
        name:req.body.name,
        email:req.body.email,
        password:hashedpassword,
        isdriver:req.body.isdriver,
        city:req.body.city
     })
     
     generatetoken(newuser._id,res)
    
     res.json(newuser)

    }
    catch(err)
    {
     console.log(err)
     res.json(err.message)
    } 
}

const loginuser=async(req,res)=>{
   
    try{
    const user=await registermodel.findOne({email:req.body.email})

    if(!user)
        {
            return res.json({error:'User is not found'})
        }
    
    const checkpassword=bcrypt.compareSync(req.body.password,user.password)
    
    if(!checkpassword)
        {
         return res.json({error:'Password is not correct'})
        }
    
     generatetoken(user._id,res)
     
     res.json(user)
    }
    catch(err)
    {
     console.log(err)
     res.json(err.message)
    } 

}

const updateuser=async(req,res)=>{
    try
    {
    
     const userid=req.user._id   
     const {name,email,password,city,language} =req.body;   

     const user=await registermodel.findById(userid)

     if(!user)
        {
            return res.json({error:'User is not found'})
        }

     if(!name && !email && !password && !city && !language)
       {
        return  res.json({error:"Provide atleast one field to update"})
       }
     
    

     if(name) user.name =name
     if (password)
        {
            const updatesalt=bcrypt.genSaltSync(10)
            const updatedhasedpassword=bcrypt.hashSync(password,updatesalt)
            user.password=updatedhasedpassword
        }
     if(email)  user.email=email
     if(city)  user.city=city
     if(language) user.language=language
     
     await user.save()

     res.json(user)
     
    }
    catch(err)
    {
     console.log(err)
     res.json(err.message)
    } 
}

const logoutuser=async(req,res)=>{
    try
    {
     res.clearCookie('token')
     res.json("User Loggedout successfully") 
    }
    catch(err)
    {
     console.log(err)
     res.json(err.message)
    } 
}

export {
    registeruser,
    loginuser,
    updateuser,
    logoutuser
}