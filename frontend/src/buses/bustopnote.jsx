import React, { useContext, useEffect } from 'react'
import Butopmodel from './butopmodel'
import { Flex } from '@chakra-ui/react'
import { buscontext } from './buscontext'

const Businfo = () => {
    
     const {headerbus,setheaderbus}=useContext(buscontext) 
     console.log(headerbus)

     useEffect(()=>{
      const getbusinfo=async()=>{
        try
        {
           const res=await fetch('/api/bus/allbuses')
           const data=await res.json()
           console.log(data)
           setheaderbus(data)
        }
        catch(e)
        {
          console.log(e)
        }
      }
      getbusinfo()
     },[])
    
   
    
  return (
   <Flex px={'5px'}
   py={'5px'} gap={'5px'}>
    {
     headerbus?.map((bus)=>{
       return   <Butopmodel bus={bus} key={bus._id}/>
     })
    }
  
   </Flex>
  )
}

export default Businfo