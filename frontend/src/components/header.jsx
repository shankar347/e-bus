import { Avatar, Box, Flex, Image, Input, Text } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import logo from '../assets/logo.png'
import { CgArrowDown, CgArrowDownO, CgChevronDown, CgChevronUp, CgCornerDownRight, CgPentagonDown, CgPushDown, CgSearch } from 'react-icons/cg'
import { FaArrowAltCircleDown } from 'react-icons/fa'
import { FaTurnDown } from 'react-icons/fa6'
import Userinfomodel from './userinfomode'
import { useRecoilValue } from 'recoil'
import useratom from '../atoms/useratom'
import { buscontext } from '../buses/buscontext'

const Header = () => {



  const {allbuses,setallbuses,
    filteredbuses,setfilteredbuses,
  setsearchmodel,isopen,setisopen,
  searchinput,setsearchinput}=useContext(buscontext)
  
  const [loading,setloading]=useState(false)
  const user=useRecoilValue(useratom)

  useEffect(()=>{
    const getallbuses=async()=>{
      try
      {
      const res=await fetch('/api/bus/allbuses')
      const data=await res.json()
      setallbuses(data)
      }
      catch(err){
       console.log(err)
      }
    }
    getallbuses()

  },[])

  
  const handleinputchange=async(e)=>{
   setsearchinput(e.target.value)
   try
   {
    const searchedbus=allbuses?.filter((bus)=>{
      let searchterm=e.target.value.toLowerCase()
      let destination=bus.route.destination.toLowerCase()
      return destination.includes(searchterm)
    }) 
    setfilteredbuses(searchedbus)
   }
   catch(err)
   {
    console.log(err)
   }
    
  }

  return (
   <>
   <Flex 
   className='siva'
   height={'50px'}
   justifyContent={'space-between'}>
    <Flex ml={{
      base:'',
      lg:'10px'
    }}
    gap={{
      md:'1',
    lg:'1',
    base:'1'}}
    alignItems={'center'} >
 <Image src={logo} width={'40px'}
    height={'40px'} /> 
   <Text 
   fontWeight={'600'}
   fontFamily={'sans-serif'}
   fontSize={{
    md:'22px',
    lg:'22px',
    base:'20px'}}>
   Tharo 
   </Text>       
   </Flex>
   <Flex 
  //  ml={{
  //   md:'400px',
  //   lg:'',
  //   base:'',
  //   sm:''
  //  }}
   my={'auto'}
   bg={'gray.200'} 
   width={{
    md:'400px',
    lg:'400px',
    base:'250px'
   }}
   borderRadius={'7px'}
   height={
    {
      md:'40px',
      lg:'40px',
      base:'35px'
    }
   }>
    <Box alignSelf={'center'}>
    <CgSearch size={'25'} color='black'
    />
    </Box>
   <input className='searchbar'
   onClick={()=>setsearchmodel(true)}
   value={searchinput} 
   onChange={handleinputchange}
    placeholder='Search your bus' />
   </Flex>
   <Flex 
  //  ml={{
  //   md:'400px'
  //  }}
   mr={{
    md:'20px',
    lg:'20px',
    base:'10px',
    sm:'10px'
   }}
   cursor={'pointer'}
   justifyContent={''}
   bg={'gray.300'}
   width={'80px'}
   height={'40px'}
   borderRadius={'50px'}
   gap={'5px'}
   alignSelf={'center'}>
    <Avatar 
    ml={'5px'}
    width={'33px'}
    height={'33px'}
    src=''
    alignSelf={'center'}
    name={user?.name}
    onClick={()=>setisopen(true)}
    />
    <Box 
     alignSelf={'center'}>
    { isopen ?  <CgChevronUp
    size={'25'}
    onClick={()=>setisopen(false)}
    color='gray.700'/> : <CgChevronDown
    size={'25'}
    onClick={()=>setisopen(true)}
    color='gray.700'/>
    }
    </Box>
   </Flex>
   </Flex>
   </>
  )
}

export default Header