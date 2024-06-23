import React, { useContext } from 'react'
import Businfo from '../buses/bustopnote'
import Bushome from '../buses/bushome'
import { buscontext } from '../buses/buscontext'
import { Box, CloseButton, Flex, Text, filter } from '@chakra-ui/react'
import Infomodel from '../buses/infomodel'

const Homecomponent = () => {
  const {searchmodel,filteredbuses,setsearchmodel,
    searchinput
  } = useContext(buscontext)

  return (
    <Flex flexDir={'column'} width={'full'}
    height={
      {base: 'full',
       md:'80vh'
    }} position={'relative'}>
     {
       searchmodel && (
       <Flex zIndex={1}
         background={'white'}
       boxShadow={'0px 1px 17px 0px'} 
       width={{
        md:'650px',
        lg:'650px',
        base:'100%',
        sm:'100%',
       }}
       flexDirection={'column'}
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
       height={'full'}
        position={'absolute'}>
       <Flex width={'full'}
       mt={'5px'} fontFamily={'sans-serif'}>
        <Flex width={'full'} justifyContent={'center'}>
        <Flex flexDir={'column'}> 
        <Text fontSize={'19px'}
        fontWeight={'600'} alignItems={'center'}>
          See all buses
        </Text>
        <Box width={'70px'} height={'4px'} alignSelf={'center'}
        background={'rgba(15, 73, 90, 0.667)'}
        borderRadius={'5px'}>
        </Box>
        </Flex>
        </Flex>
        <CloseButton onClick={()=>setsearchmodel(false)}
        mt={'-5px'}
        _hover={{
          background:'rgba(15, 73, 90, 0.667)'
        }}/>
        </Flex>
        <Flex mt={'10px'} flexDirection={'column'}>
        {
         searchinput?.length !==0 &&  filteredbuses?.map((bus)=>(
            <Infomodel key={bus._id} bus={bus}/>
          ))
        }
        </Flex>
        {
         searchinput?.length === 0 && (
            <Flex width={'full'}
            height={'full'}
            justifyContent={'center'}
            // mt={{base:'100px',
            //   sm:'100px',
            //   md:'200px',
            //   lg:'100px'
            // }}
            marginLeft={{
              md:'100px',
              lg:'100px',
              base:'0',
              sm:'0'}}
            className='background1'
            // backgroundImage={'url()'}
            >
            <Text ml={{
              md:'-150px',
              lg:'-100px',
              base:'0',
              sm:'0'
            }}
            fontSize={'18'}
            >
              Search your Bus route or Destintion
            </Text>
            </Flex>
          )
        }
        {
          filteredbuses?.length === 0 && (
            <Flex width={'full'}
            height={'full'}
            justifyContent={'center'}
            // mt={{base:'100px',
            //   sm:'100px',
            //   md:'200px',
            //   lg:'100px'
            // }}
            marginLeft={{
              md:'100px',
              lg:'100px',
              base:'0',
              sm:'0'}}
            className='background1'
            // backgroundImage={'url()'}
            >
            <Text ml={{
              md:'-150px',
              lg:'-100px',
              base:'0',
              sm:'0'
            }}
            color={'red.600'}
            fontSize={'22'}
            fontWeight={'500'}
            > 
             Bus is not found
            </Text>
            </Flex>
          )
        }
       </Flex> 
       )
     }
    <Businfo/>
    <Bushome/>
    
    </Flex>
  )
}

export default Homecomponent