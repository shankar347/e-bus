import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { FaBus, FaMapMarkerAlt } from 'react-icons/fa'

const Bussidemodel = ({bus}) => {




  return (
    <Flex flexDirection={'column'} cursor={'pointer'} _hover={{
        opacity:'0.9',
        boxShadow:'2px 0px 15px 0px'
      }}>
      <Flex mt={'5px'} ml={'10px'} 
        alignItems={'center'}  gap={'5px'}>
         <FaBus/>
         <Text fontWeight={'550'}>
          {bus?.busnumber}
         </Text>
        </Flex>
        <Flex mt={'5px'} ml={'10px'} alignItems={'center'}
        gap={'5px'}>
          <FaMapMarkerAlt/>
         <Flex gap={'5px'}>
         <Text fontSize={'16px'} >
             {bus?.route?.start}
           </Text>
           <Text fontSize={'16px'}>
            -
           </Text>
           <Text fontSize={'16px'}>
           {bus?.route?.destination}
           </Text>
         </Flex>
        </Flex>
        <Box width={'full'} bg={'rgba(15, 73, 90, 0.167)'} 
        mt={'5px'} height={'2px'}></Box>
      </Flex>
  )
}

export default Bussidemodel