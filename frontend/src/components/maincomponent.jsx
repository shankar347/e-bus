import { Flex } from '@chakra-ui/react'
import React, { useContext } from 'react'
import Header from './header'
import Homecomponent from './homecomponent'
import Userinfomodel from './userinfomode'
import { buscontext } from '../buses/buscontext'

const Maincomponent = () => {
  const {isopen} =useContext(buscontext)
  return (
    <>
    <Header/>
    <Homecomponent/>
    <Userinfomodel isopen={isopen}/>
    </>
  )
}

export default Maincomponent