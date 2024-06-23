import jwt from 'jsonwebtoken'
import registermodel from '../datebase/registerschema.js';

const authuser=async(req,res,next)=>{
 
    const token=req?.cookies?.token;

    if(!token)
        {
          return res.json({error:'User is unauthorized'})
        }

    const decoded=jwt.verify(token,process.env.JWT_SECRET)
    
    const user= await registermodel.findById(decoded.userid)
    .select('-password')

    req.user=user

    next()
    
}

export default authuser