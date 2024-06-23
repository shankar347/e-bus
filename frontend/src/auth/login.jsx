import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, InputGroup, InputRightElement, Link, Stack, Text, useColorModeValue, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useRecoilState } from 'recoil'
import authatom from '../atoms/authatom'
import useratom from '../atoms/useratom'

const Login = () => {

    const [atomstate,setatomstate]=useRecoilState(authatom)
    const [showPassword,setShowPassword]=useState(false)
    const [actions,setactions]=useState({
        email:'',
        password:''
    })
  
    const [userstate,setuserstate]=useRecoilState(useratom)
    const toast=useToast()
    const handlelogin=async()=>{
         try{
           const res=await fetch('/api/user/login',{
            method:'POST',
            headers:{
                'content-Type':'application/json'
            },
            body:JSON.stringify(actions)
           })
           const data=await res.json()

           if(data.error)
            {
                toast({
                    description:data.error,
                    title:'error',
                    status:'error'
                })
                return;
            }
            localStorage.setItem('token',JSON.stringify(data))
            setuserstate(data)
            toast({
                description:"Logged in sucessfully",
                status:'success'
            })
         }
         catch(err)
         {
            console.log(err)
         }
    }
  return (
    <Flex
    align={'center'}
    justify={'center'}
    >
    <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={3}>
      <Stack align={'center'}>
        <Heading fontSize={'4xl'} textAlign={'center'}>
          Login
        </Heading>
       
      </Stack>
      <Box
        rounded={'lg'}
        border={'1px solid'}
        borderColor={'gray.500'}
        boxShadow={'lg'}
        p={8}
        w={'md'}>
        <Stack spacing={4}>

        

          <FormControl  isRequired>
            <FormLabel>Email address</FormLabel>
            <input type="email" className='inputfield'
               onChange={(e)=>setactions({...actions,email:e.target.value})}/>
          </FormControl>
          <FormControl  isRequired>
            <FormLabel
            >Password</FormLabel>
            <InputGroup>
              <input className='inputfield'
               type={showPassword ? 'text' : 'password'} 
                 onChange={(e)=>
                 setactions({...actions,password:e.target.value})}/>
              <InputRightElement
               h={'90%'}
               alignSelf={'center'}>
                <Button
                  variant={'ghost'}
                  height={'33px'}
                  alignSelf={'center'}
                  mt={'5px'}
                  mr={'5px'}
                  onClick={() => setShowPassword((showPassword) => !showPassword)}>
                  {showPassword ? <ViewIcon
                   /> : <ViewOffIcon />}
                 
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
         
          <Stack spacing={10} pt={2}>
            <Button
              loadingText="Submitting"
              size="lg"
              bg={useColorModeValue('gray.600','gray.700')}
              color={'white'}
              _hover={{
                bg: useColorModeValue('gray.700','gray.800'),
              }}
              onClick={handlelogin}>
              Login
            </Button>
          </Stack>
          <Stack pt={2}>
            <Text
             align={'center'}>
              Don't have an account <Link color={'blue.400'}
              onClick={()=>setatomstate('register')}>Register</Link>
            </Text>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  </Flex>  
   )
}

export default Login