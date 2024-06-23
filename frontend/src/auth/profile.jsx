import { Avatar, Box, Button, Center, Flex, FormControl, FormLabel, HStack, Heading, Input, Stack, Text, useColorModeValue, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import useratom from '../atoms/useratom'
import {Link as router, useNavigate} from 'react-router-dom'
const Profile = () => {

    const [user,setuser]=useRecoilState(useratom)
    console.log(user)   
    const [updating,setupdating]=useState(false)
    const [actions,setactions]=useState({
       name:'',
       email:'',
       password:'',
       city:'',
       language:''
      })
      const navigate=useNavigate()
     const toast=useToast()
      
     useEffect(()=>{
      setactions({
        name:user?.name,
        email:user?.email
      })
     },[])

      const handleuserupdate=async()=>{
          try{
            setupdating(true)
            const res=await fetch('/api/user',{
                method:'PUT',
                headers:{
                    'content-Type':'application/json'
                },
                body:JSON.stringify(actions)
            })
            const data=await res.json()
             console.log(data)
            
           if(data.error)
            {
                toast({
                    description:data.error,
                    title:'error',
                    status:'error'
                })
                return;
            }
            setuser(data) 
            localStorage.setItem('token',JSON.stringify(data))
            navigate('/')
            toast({
                description:"Profile updated successfully",
                status:'success'
            })
            
          }
          catch(err)
          {
            console.log(e)
          }
          finally{
            setupdating(false)
          
          }
      }
      
    return (
        <form >
    <Flex
    minH={'100vh'}
    align={'center'}
    justify={'center'}
   >
    <Stack
      spacing={4}
      w={'full'}
         border={'1px solid'}
        borderColor={'gray.500'}
      maxW={'lg'}
      bg={useColorModeValue('white', 'gray.dark')}
      rounded={'xl'}
      boxShadow={'lg'}
      p={6}
      px={8}
      my={12}>
      <Heading alignSelf={'center'} lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
        User Profile 
      </Heading>
      <FormControl id="userName">
        <Stack direction={['column', 'row']} spacing={6}>
          <Center>
            <Avatar size="xl" 
             name={user?.name}
             border={'1px solid gray'}
             />
          </Center>
          <Flex flexDirection={'column'} ml={'10px'}>
            <Flex fontFamily={'sans-serif'} mt={'20px'} 

            alignItems={'baseline'} gap={'8px'}>
            <Text fontSize={'22px'}>
                Hi!
            </Text>
            <Text fontSize={'18px'}>
              {user?.name}
            </Text>
            </Flex >
            <Text
            fontFamily={'sans-serif'}
             fontSize={'16px'} mt={'8px'}>
                Welcome to Tharo for the comfort journey
            </Text>
            </Flex>
        </Stack>
      </FormControl>
      <FormControl >
        <FormLabel>User name</FormLabel>
        <input className='inputfield'
          placeholder="UserName"
          _placeholder={{ color: 'gray.500' }}
          type="text"
         value={actions.name}
         onChange={(e)=>setactions({...actions,name:e.target.value})}
        />
      </FormControl>
        
      <FormControl >
        <FormLabel>Email address</FormLabel>
        <input className='inputfield'
          placeholder="your-email@example.com"
          _placeholder={{ color: 'gray.500' }}
          type="email"
          value={actions.email}
          onChange={(e)=>setactions(
            {...actions ,email:e.target.value})}
        />
      
      </FormControl>
      <FormControl id="password" >
        <FormLabel>Password</FormLabel>
        <input className='inputfield'
          placeholder="password"
          _placeholder={{ color: 'gray.500' }}
          type="password"
          value={actions.password}
          onChange={(e)=>setactions(
            {...actions ,password:e.target.value})}
        />
      </FormControl>
      <HStack> 
              <Box>
                <FormControl >
                  <FormLabel>Language</FormLabel>
                  <select className='options1' 
                  onChange={(e)=>setactions({...actions,language:e.target.value})}>
                   
                    <option className='option'>
                       Tamil    
                    </option>
                    <option>
                        English
                    </option>
                    <option>
                        English
                    </option> <option>
                        English
                    </option> <option>
                        English
                    </option> <option>
                        English
                    </option>
                  </select>
                </FormControl>
              </Box>
              <Box>
                <FormControl >
                  <FormLabel>Select City</FormLabel>
                  <select className='options1'
                  onChange={(e)=>setactions({...actions,city:e.target.value})}>
                    <option className='option'>
                      Chennai 
                    </option>
                    <option>
                        Bengalore
                    </option>
                  </select>
                </FormControl>
              </Box>
            </HStack>
      <Stack spacing={6} 
      mt={'10px'} direction={['column', 'row']}>
        <Button
        as={router}
        to={'/'}
          bg={'red.400'}
          color={'white'}
          w="full"
          _hover={{
            bg: 'red.500',
          }}
          
          >
          Cancel
        </Button>
        <Button
        onClick={handleuserupdate}
          bg={'blue.400'}
          color={'white'}
          w="full"
          _hover={{
            bg: 'blue.500',
          }} 
          isLoading={updating}>
          Submit
        </Button>
      </Stack>
    </Stack>
  </Flex>
 </form> 
 
  )
}

export default Profile