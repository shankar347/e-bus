import { Button, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import {Link as router} from 'react-router-dom'
import { AiFillMail, AiOutlineHeatMap, AiOutlineMail } from 'react-icons/ai'
import { CgMail } from 'react-icons/cg'
import { FaLanguage, FaMailBulk, FaMailchimp, FaMap, FaMapMarkerAlt, FaMapPin, FaRegUser, FaSignLanguage, FaVoicemail } from 'react-icons/fa'
import { FaMapLocation, FaMapLocationDot } from 'react-icons/fa6'
import { MdLanguage } from 'react-icons/md'
import { useRecoilState } from 'recoil'
import useratom from '../atoms/useratom'

const Userinfomodel = ({isopen}) => {

   const [userinfo,setuserinfo]=useRecoilState(useratom)

   const handlelogout=async()=>{
      const res=await fetch('/api/user')
      const data=await res.json()

      localStorage.removeItem('token')
      setuserinfo(null)
      console.log(data)
   }

   return (
    <>
    {
        isopen  &&(
           <Flex 
            position={'absolute'}
            top={16}
           right={'8'} 
           className='background'
           width={'350px'}
           height={'280px'}
           backgroundColor={'gray.200'}
           boxShadow={'0px 1px 9px -1px'}
           color={'black'}>
            <Flex fontFamily={'sans-serif'}
             flexDir={'column'} width={'full'}
             height={'full'}
             ml={'30px'}>
             <Text mx={'auto'}
             mt={'10px'}
             fontSize={'19px'}
             fontWeight={'500'}>
                User Details
             </Text>
            <Flex alignItems={'center'}
            mt={'20px'}
            gap={2}>
               <FaRegUser  color='rgba(53, 122, 174, 0.855)'
               size={'20'}/> 
               <Text mt={'1'} 
               fontSize={'sm'}>
                {userinfo?.name}
                </Text> 
            </Flex> 
            <Flex 
            mt={'10px'}
            gap={'2'}>
              <AiOutlineMail size={'20'} 
              color='rgba(53, 122, 174, 0.855)'/> 
               <Text fontSize={'sm'}>
                 {userinfo?.email}
               </Text>
            </Flex>
            <Flex 
            mt={'10px'}
            gap={'2'}
            >
               <FaMapMarkerAlt color='rgba(53, 122, 174, 0.855)'
               size={'20'}/>
               <Text fontSize={'sm'}>
               {userinfo?.city}
               </Text>
            </Flex>
            <Flex 
            mt={'10px'}
            gap={'2'}
            >
            <MdLanguage size={'20'} color='rgba(53, 122, 174, 0.855)'/>
            <Text  fontSize={'sm'}> 
            {userinfo?.isdriver ? 'Driver': "User"}
            </Text>
            </Flex>
            <Flex justifyContent={'space-around'}
            mt={'40px'}>
            <Button
            fontSize={'sm'}
            color={'black'}
            height={'36px'}
            _hover={{
               backgroundColor:'rgba(53, 122, 174, 0.4)'
            }}
            as={router}
            to={'/profile'}
            backgroundColor={'rgba(53, 122, 174, 0.855)'}
             width={'100px'}>
               Update
            </Button>
            <Button  fontSize={'sm'}
            color={'black'}
            height={'36px'}
            _hover={{
               backgroundColor:'red.300'
            }}
            backgroundColor={'red.400'}
             width={'100px'}
             onClick={handlelogout}>
               Logout
            </Button>
            </Flex>
           </Flex>    
           </Flex> 
        )
    }
    </> 
   
  )
}

export default Userinfomodel