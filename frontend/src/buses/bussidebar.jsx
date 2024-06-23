import { Box, Flex, Image, Text } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import useratom from '../atoms/useratom'
import { FaBus, FaMapMarkedAlt, FaMapMarkerAlt } from 'react-icons/fa'
import { buscontext } from './buscontext'
import Bussidemodel from './bussidemodel'
import logo from '../assets/logo.png'
import Createbus from './buscreate'

const Bussidebar = () => {
  
   const user=useRecoilValue(useratom)
   const [latestbus,setlatestbus]=useState(null)
   const {headerbus,setheaderbus,
    busmodel,setbusmodel}=useContext(buscontext) 
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
  
    useEffect(()=>{
        const getlatestbus=async()=>{
           const res=await fetch('/api/bus/latest')
           const data=await res.json()
           console.log(data) 
           setlatestbus(data)
        }
        getlatestbus()
    },[])
   

    
  return (
    <Flex w={'30%'} bg={'rgba(15, 73, 90, 0.667)'} 
    height={'535px'} pl={'7px'}  
    flexDirection={'column'} fontFamily={'sans-serif'}>
     <Flex mt={'10px'} 
     gap={'10px'} alignItems={'baseline'} >
     <Flex fontSize={'22px'}fontWeight={'600'}>
      Hello!
     </Flex>
     <Flex fontSize={'17px'} fontWeight={'600'}>
      {user?.name}
     </Flex>
     </Flex>
     <Flex fontSize={'17px'} fontWeight={'600'}  mt={'7px'}>
      Welcome to Tharo for the Fast Tracking and info of the Bus
     </Flex>
      <Text fontWeight={'550'} fontSize={'17px'}
      mt={'7px'} >
        Recent Bus
      </Text>
      <Flex mt={'5px'} ml={'10px'} 
      alignItems={'center'}  gap={'5px'}>
       <FaBus/>
       <Text fontWeight={'550'}>
        {latestbus?.busnumber}
       </Text>
      </Flex>
      <Flex mt={'5px'} ml={'10px'} alignItems={'center'}
      gap={'5px'}>
        <FaMapMarkerAlt/>
       <Flex gap={'5px'}>
       <Text fontSize={'16px'} >
           {latestbus?.route?.start}
         </Text>
         <Text fontSize={'16px'}>
          -
         </Text>
         <Text fontSize={'16px'}>
         {latestbus?.route?.destination}
         </Text>
       </Flex>
      </Flex>
      <Flex mt={'15px'} ml={'50px'}
       gap={'10px'}>
        <Flex 
        border={'2px solid'}
        color={'black'}
        borderColor={'gray.900'}
        cursor={'pointer'}
        borderRadius={'50px'} px={'23px'}
        _hover={{
          bg:'rgba(15, 73, 90, 0.5)',
          borderColor:'transparent'
         }}
         _focus={{
          bg:'rgba(15, 73, 90, 0.5)'
         }}
        fontSize={'sm'} 
        py={'5px'}
        boxShadow={'2px 2px 14px 2px'}
       >
          Track Bus
        </Flex>
        <Flex fontSize={'sm'}
      borderRadius={'50px'}
      bg={'gray.300'}
      py={'5px'}
      alignSelf={'center'}
      px={'10px'}
      cursor={'pointer'}
      _hover={{
        bg:'gray.400',
      }}
      _focus={{
        bg:'gray.400',
      }}
      boxShadow={'2px 2px 14px 2px'}
           >
          See about Bus
        </Flex>
      </Flex>
      <Text fontWeight={'550'} fontSize={'17px'}
      mt={'17px'} mb={'4px'}>
         More Buses
      </Text>
    {
     headerbus?.map((bus)=>(
      <Bussidemodel key={bus._id} bus={bus}/>
     )).slice(0,2)
    }

    {
      user?.isdriver && (
         <Flex justifyContent={'center'}
         mx={'auto'}  mt={'15px'}  px={'15px'} 
         cursor={'pointer'} fontFamily={'sans-serif'}
          width={'200px'} py={'8px'} fontSize={'sm'} 
         border={'2px solid gray.800'} 
         boxShadow={'0px 0px 10px 1px'} 
         borderRadius={'50px'}
         _hover={{
          bg:'rgba(15, 73, 90, 0.5)',
          borderColor:'transparent'
         }}
         fontWeight={'600'}
         _focus={{
          bg:'rgba(15, 73, 90, 0.5)'
         }}
         onClick={()=>setbusmodel(true)}>
          Upload Bus
          </Flex>
      )
    }   

    <Flex mt={user?.isdriver ? '25px' : '70px' } alignItems={'center'} 
    justifyContent={'center'}>
    <Image src={logo} width={'40px'}
    height={'40px'} /> 
   <Text 
   fontWeight={'600'}
   fontFamily={'sans-serif'}
   fontSize={{
    md:'20px',
    lg:'20px',
    base:'20px'}}>
   Tharo 
   </Text>    
    </Flex>
    <Createbus/>
    </Flex>
  )
}

export default Bussidebar