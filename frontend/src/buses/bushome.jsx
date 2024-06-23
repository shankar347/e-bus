import React from 'react'
import Busmain from './busmain'
import Bussidebar from './bussidebar'
import { Flex } from '@chakra-ui/react'

const Bushome = () => {
  return (
    <Flex >
      <Busmain/>
      <Bussidebar/>
    </Flex>
  )
}

export default Bushome