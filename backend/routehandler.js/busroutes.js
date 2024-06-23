import busmodule from "../datebase/buschema.js"



const createbusroute=async(req,res)=>{
   try
   {
   const {busnumber,route,bustype} =req.body;
     
    const findbus=await busmodule.find({$and:
      [
         {busnumber:busnumber},
         {"route.start":route.start},
         {"route.destination":route.destination},
         {bustype:bustype}
      ]})   
     


      if(findbus.length > 0)
       {
         return res.json({error:"Bust route is already existing",findbus})
       }  

    const Bus = await busmodule.create(req.body)
    
    res.json(Bus)

   }
   catch(err)
   {
    console.log(err)
    res.json(err)
   }
}

let latustfetchedbus=null;

const getbus=async(req,res)=>{
   
    try{
     const {start,destination} =req.params;

     let bus;
          
         if (start && destination)
         {

         return bus=await busmodule.find({
        'route.start':start,
        'route.destination':destination})
         }

        else if( bus.length > 0)
            {
             return latustfetchedbus=bus[bus.length - 1]
            }

      res.json(bus)

    }
    catch   (err)
    {
     console.log(err)
     res.json(err)
    }
}

const getallbuses=async(req,res)=>{
   try
   {
   const bus=await busmodule.find({})
  
   res.json(bus)
    
 
   if(bus.length > 0) 
      {
         return latustfetchedbus=bus[bus.length -1]
      }


   }
   catch(err)
   {
      console.log(err)
   }
}


const updatelocation=async(req,res)=>{
   try
   {
    const {id} = req.params;
    const {currentlocation}=req.body;
   
    const bus=await busmodule.findByIdAndUpdate(id,
        {currentlocation}
       , {new:true}
    )
    
    if(!bus)
      {
         return res.json({error:"Bus is not existing"})
      }
    
    res.json(bus)
   }
   catch(err)
   {
     console.log(err)
     res.json(err)
   }
}

const getlatestbus=async(req,res)=>{
   try
   {
    if(latustfetchedbus)
      {
         res.json(latustfetchedbus)
      }  

      else
      {
         return res.json({error:"No Buses have been fetched yet"})
      }
   }
   catch(err)
   {
     console.log(err)
     res.json(err)
   }
}

export {
    createbusroute,
    getbus,
    updatelocation,
    getlatestbus,
    getallbuses
}