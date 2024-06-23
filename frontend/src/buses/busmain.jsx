import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import MapIframe from './busmap'
import LeafletMapComponent from './busmap1'

const Busmain = () => {
  return (
    <Flex w={'70%'} flexDir={'column'} >
       <Text fontFamily={'sans-serif'} fontWeight={'600'}
       fontSize={'20px'}
       ml={'10px'}>
        Buses around you
       </Text>
       <Box mx={'20px'} 
        mt={'10px'} border={'2px solid'} borderColor={'gray.400'}>
       <LeafletMapComponent/>
       </Box>
    </Flex>
  )
}

export default Busmain