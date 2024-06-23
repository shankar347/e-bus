import { Box, Button, Flex, FormControl, FormLabel, HStack, Heading, Input, InputGroup, InputRightElement, Link, Select, Stack, Text, useColorModeValue, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useRecoilState } from 'recoil'
import authatom from '../atoms/authatom'
import {ViewIcon,ViewOffIcon} from '@chakra-ui/icons'
import useratom from '../atoms/useratom'
const Register = () => {

    const [actions,setactions]=useState({
        name:'',
        password:'',
        email:'',
        isdriver:'',
        city:''
    })
    
    const [userstate,setuserstate]=useRecoilState(useratom)
    const [showPassword,setShowPassword]=useState(false)
    const [authstate,setatomstate]=useRecoilState(authatom)
    const toast=useToast()
    const handlesignup=async()=>{
      try{
        const res=await fetch('/api/user',{
            method:'POST',
            headers:{
                'content-Type':"application/json"
            },
            body:JSON.stringify(actions)
        })
        const data=await res.json()
        
        if(data.error)
            {
                toast({
                    description:data.error,
                    title:'Error',
                    status:'error'
                })
                return;
            }
        
        setuserstate(data)
        localStorage.setItem('token',JSON.stringify(data))

        toast({
            description: "Registeration Completed",
            status:'success',
             title:'Success'
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
          Sign up
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
            <FormLabel>User Name</FormLabel>
            <input type="text" className='inputfield'
               onChange={(e)=>setactions({...actions,name:e.target.value})}/>
          </FormControl>  

          <FormControl  isRequired>
            <FormLabel>Email address</FormLabel>
            <input type="email" className='inputfield'
               onChange={(e)=>setactions({...actions,email:e.target.value})}/>
          </FormControl>
          <FormControl  isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <input className='inputfield'
               type={showPassword ? 'text' : 'password'} 
                 onChange={(e)=>
                 setactions({...actions,password:e.target.value})}/>
              <InputRightElement h={'full'}>
                <Button
                 height={'33px'}
                  alignSelf={'center'}
                  mt={'5px'}
                  mr={'5px'}
                  variant={'ghost'}
                  onClick={() => setShowPassword((showPassword) => !showPassword)}>
                  {showPassword ? <ViewIcon
                   /> : <ViewOffIcon />}
                 
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <HStack> 
              <Box>
                <FormControl  isRequired>
                  <FormLabel>Is Driver</FormLabel>
                  <select className='options' 
                  onChange={(e)=>
                  setactions({...actions,isdriver:e.target.value})}>

                   <option value={false}>
                      No
                    </option>

                    <option value={true} className='option'>
                       Yes    
                    </option>
                  
                  </select>
                </FormControl>
              </Box>
              <Box>
                <FormControl isRequired>
                  <FormLabel>Select City</FormLabel>
                  <select className='options'
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
          <Stack spacing={10} pt={2}>
            <Button
              loadingText="Submitting"
              size="lg"
              bg={useColorModeValue('gray.600','gray.700')}
              color={'white'}
              _hover={{
                bg: useColorModeValue('gray.700','gray.800'),
              }}
              onClick={handlesignup}>
              Sign up
            </Button>
          </Stack>
          <Stack pt={2}>
            <Text
             align={'center'}>
              Already a user? <Link color={'blue.400'}
              onClick={()=>setatomstate('login')}>Login</Link>
            </Text>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  </Flex>
  )
}

export default Register