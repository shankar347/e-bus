import React, { useContext, useEffect, useState } from 'react'
import Butopmodel from './butopmodel'
import { Flex, Spinner } from '@chakra-ui/react'
import { buscontext } from './buscontext'

const Businfo = () => {
    
     const {headerbus,setheaderbus}=useContext(buscontext) 
     const [loading,setloading]=useState(false)
     console.log(headerbus)

     useEffect(()=>{
      const getbusinfo=async()=>{
        try
        {
          setloading(true)
           const res=await fetch('/api/bus/allbuses')
           const data=await res.json()
           console.log(data)
           setheaderbus(data)
        }
        catch(e)
        {
          console.log(e)
        }
        finally{
          setloading(false)
        }
      }
      getbusinfo()
     },[])
    
   
    
  return (
   <Flex px={'5px'}
   py={'5px'} height={'120px'} gap={'5px'}>
    {
      headerbus?.map((bus)=>{
       return   <Butopmodel bus={bus} key={bus._id}/>
     })
    }

    {
      loading && (
        <Flex  w={'full'} justifyContent={'center'} h={'120px'}
        alignItems={'center'} >
        <Spinner/>
        </Flex>
      )
    }
   </Flex>
  )
}

export default Businfo