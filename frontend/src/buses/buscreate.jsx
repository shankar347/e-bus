import { Box, Button, CloseButton, Flex, FormControl, FormLabel, HStack, Heading, Link, Stack, useColorModeValue, useToast } from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import { Form } from 'react-router-dom'
import { buscontext } from './buscontext'

const Createbus = () => {

    const [bus,setbus]=useState({
        bustype:'',
        busnumber:'',
        route:{
            start:'',
            destination:''
        },
        stops:'',
        timedetails:{
            starttime:'',
            endtime:''
        }
    })

    const {busmodel,setbusmodel}=useContext(buscontext)
    const toast=useToast()       
    const handlechange=(e)=>{
       
        const {value,name} =e.target;

        if(name.startsWith('route.'))
            {
                const route=name.split('.')[1];
                setbus({
                    ...bus,
                    route:{
                        ...bus.route,
                        [route]: value
                    }
                })
            }
        else if (name.startsWith('timedetails.'))
            {
                const timedetails=name.split('.')[1];
                setbus({
                    ...bus,
                    timedetails:{
                        ...bus.timedetails,
                        [timedetails]: value
                    }
                })
            }    
          else
          {
            setbus({
                ...bus,
                [name]:value
            })
          }  
    }


    const handlecreate=async()=>{
     try{
      const res=await fetch('api/bus',{
        method:'POST',
        headers:{
            'content-Type':'application/json'
        },
        body:JSON.stringify(bus)
    })
    const data=await res.json()
     if(data.error)
      {
        toast({
          description:data.error,
          status:'error'
        })
      } 
     toast({
      description:'Bus Uploaded Sucessfully',
      status:'success'
     })
     }
     catch(err)
     {
      console.log(err)
     } 
     finally{
      setbusmodel(false)
      setbus({
        bustype:'',
        busnumber:'',
        route:{
            start:'',
            destination:''
        },
        stops:'',
        timedetails:{
            starttime:'',
            endtime:''
        }
    })
     }


    }

  return ( 
<>
    {busmodel && <Flex
    bg={'white'}
    zIndex={1}
    align={'center'}
    justify={'center'}
    position={'absolute'}
    borderRadius={'5px'}
    boxShadow={'0px 1px 17px 0px'} 
    width={{
        md:'600px',
        lg:'600px',
        base:'100%',
        sm:'100%',
       }}
       transform={'translateX(-50%)'}
       left={{
        sm:'50%',
        base:'50%',
        md:'50%',
        lg:'50%'
       }}
       
       bottom={''}
       right={{
        sm:'50%',
        base:'50%',
        md:'50%',
        lg:'50%'
       }}
       top={1}
    >
    <Stack spacing={8} mx={'auto'} maxW={'lg'} py={5} px={3}>
      <Stack align={'center'}>
        <Heading fontSize={'2xl'} textAlign={'center'}>
          Upload Bus
        </Heading>
       <CloseButton position={'absolute'} 
       onClick={()=>setbusmodel(false)} right={'0'} top={'0'} 
       bg={''} 
       _hover={{bg:'red.400'}} 
       _focus={{bg:'red.400'}} borderRadius={'0'}/>
      </Stack>
      <Box
        rounded={'lg'}
        border={'1px solid'}
        borderColor={'gray.500'}
        boxShadow={'lg'}
        p={8}
        py={4}
        w={'md'}>
        <Stack spacing={4}>

        <FormControl  isRequired>
            <FormLabel>Bus Number</FormLabel>
            <input type="text" name='busnumber' value={bus.busnumber} 
            className='inputfield'
              onChange={handlechange}/>
          </FormControl>  

          <FormControl
            isRequired>
            <FormLabel>Bus Type</FormLabel>
            <input type="text" className='inputfield'
            name='bustype' value={bus.bustype}
            onChange={handlechange}/>
          </FormControl>
          <HStack>
            <Box>
            <FormControl>
                <FormLabel>
                    Start
                </FormLabel>
                <input type='text'
                style={{cursor:'auto',paddingLeft:'5px'}}
                 className='options' 
               onChange={handlechange}
               name='route.start' value={bus.route.start}/>
            </FormControl>
            </Box>
            <Box>
            <FormControl>
                <FormLabel>
                    Destination
                </FormLabel>
                <input type='text' 
                style={{cursor:'auto',paddingLeft:'5px'}}
                onChange={handlechange}
                name='route.destination'
                value={bus.route.destination}
                 className='options'/>
            </FormControl>
            </Box>
          </HStack>
           
         <FormControl>
            <FormLabel>
                Stops 
               <input 
               onChange={handlechange}
               className='inputfield' 
               name='stops'
               value={bus.stops}/> 
            </FormLabel>
         </FormControl>
          
         <HStack>
            <Box>
            <FormControl>
                <FormLabel>
                    Start Time
                </FormLabel>
                <input style={{cursor:'auto',paddingLeft:'5px'}}
                 type='text'
                onChange={handlechange}
                 className='options'
                 name='timedetails.starttime'
                 value={bus.timedetails.starttime}/>
            </FormControl>
            </Box>
            <Box>
            <FormControl>
                <FormLabel>
                   End Time
                </FormLabel>
                <input style={{cursor:'auto',paddingLeft:'5px'}}
                 type='text' 
                name='timedetails.endtime'
                value={bus.timedetails.endtime}
                onChange={handlechange}
                className='options'/>
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
              onClick={handlecreate}
             >
              Upload
            </Button>
          </Stack>
         
        </Stack>
      </Box>
    </Stack>
  </Flex>
}
</>
  )
}

export default Createbus