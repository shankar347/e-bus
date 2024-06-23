import { Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { FaMapMarked, FaMapMarkedAlt, FaMapMarkerAlt } from 'react-icons/fa'
import { FaMapLocation } from 'react-icons/fa6'
import { useMediaQuery } from 'react-responsive'

const Infomodel = ({bus}) => {


  const checkscreen=useMediaQuery({maxWidth:'400px'})
 
   const parsstringTotime=(timevalue)=>{
    let [time,modifier]=timevalue.split(' ')
    let [hour,minute]=time.split(':').map(Number)

    if(modifier === "AM" && hour === 12)
    {
      hour=0;
    }
    if(modifier === "PM" && hour !==12)
      {
        hour+=12
      }
  
      
      return {hour,minute}
  
   }

   const calculatedifference=(starttime,endtime)=>{
    let start=parsstringTotime(starttime)
    let end=parsstringTotime(endtime)

    let startdate=new Date(2024,0,1,start.hour,start.minute)
    let enddate=new Date(2024,0,1,end.hour,end.minute)

    if(enddate < startdate)
      {
        enddate.setDate(enddate.getDate() + 1)
      }
      
    let differnce=enddate -startdate;
    
    let differ=differnce/(1000 * 60)
    let hours=Math.floor(differ/60)
    let minutes=differ % 60

    return {hours,minutes}

   }

   let starttime="12:30 PM";
   let endtime="2:00 PM"
   let timedifference=calculatedifference(starttime,endtime)
  
   let destination="  Thiruvanmiyur Rto office"

  return (
   <Flex width={'full'}
   height={'100px'}
   bg={'white'}
   px={{
    md:'10px',
    lg:'10px',
    base:'5px',
    sm:'5px'
   }}
   py={'3px'}
   flexDirection={'flex'}
   borderBottom={'1px solid '}
   borderColor={'gray.400'}
   mb={'5px'}
  >
    <Flex flexDir={'column'}
    width={'150px'}>
    <Flex gap={'5px'} 
     flexDirection={'flex'}
     alignItems={'center'}>
      <Text fontSize={'20'}
      fontWeight={'500'}>
        {bus?.busnumber}
      </Text>
      <Text 
      px={'5px'}  
      height={'27px'}
      fontSize={'sm'}
      borderRadius={'3px'}
      background={
        bus?.bustype === "delux" ? "red" : "gray.300"   }>
        {bus?.bustype}
      </Text>
    </Flex>  
    <Flex gap={'1'} fontSize={{
        md:'md',
        lg:'md',
        sm:'sm'
    }}
    mt={{
        md:'5px',
        lg:'5px',
        base:'2px'
    }}
    fontWeight={'700'}>
     <Text>
     {bus?.route.start}
    </Text>
         -
       <Text>
       { destination.length > 10 ? destination.slice(0,10) + '...'
       : destination }
     
        </Text>   
       
    </Flex>
    <Flex  fontSize={{
        md:'md',
        lg:'md',
        sm:'sm'
    }}
    gap={'5px'}
    mt={{
      md:'5px',
      lg:'5px',
      base:'3px',
      sm:'3px'
    }}
    >
      <Text >
        Travel time:
      </Text>
      <Text>
        {timedifference.hours > 0 ? timedifference.hours + "h" + " "+
        + timedifference.minutes + "m"  : timedifference.minutes + "m"}
      </Text>
    </Flex>
    </Flex>
    <Flex flexDirection={'column'} 
    width={'130px'}
    ml={'30px'}>
      <Flex alignItems={'center'} 
      gap={'3px'}>
          <FaMapMarkerAlt />
          <Text fontWeight={'500'} 
          >
           Bus Stops
          </Text>
      </Flex>
      <Flex flexDir={'column'} 
      ml={'15px'}
      >
      {bus.route.stops.map((stop)=>(
            <Text key={stop._id} 
            fontWeight={'500'} color={'balck'} >
             {stop}
            </Text>
          )).splice(0,3)}
          </Flex>
    </Flex>
    <Flex mt={'5px'} flexDirection={'column'} 
    fontSize={'17px'}
    width={'170px'}
    fontWeight={'500'}
    >
     <Flex gap={'5px'}>
      <Text>
        Start time:
      </Text>
      <Text fontSize={'16px'} color={'gray.700'}>
        10:13 AM
      </Text>
     </Flex>
     <Flex gap={'5px'} 
     mt={'7px'}>
      <Text>
        End time:
      </Text>
      <Text fontSize={'16px'} color={'gray.700'}>
        11:43 AM 
      </Text>
     </Flex >
     <Flex alignItems={'center'} mt={'5px'} gap={'5px'}>
      <FaMapMarkedAlt/>
      <Text>
        {bus?.route?.destination}
      </Text>
     </Flex>
    </Flex>
    <Flex flexDirection={'column'} 
    alignItems={'center'}
    justifyContent={'center'}>
     <Flex fontSize={'sm'}
     px={'30px'}
     cursor={'pointer'}
     py={'7px'}
     borderRadius={'50px'}
     fontWeight={'500'}
     alignSelf={'center'}
     _hover={{
      bg:'rgba(15, 73, 90, 0.5)'
     }}
     _focus={{
      bg:'rgba(15, 73, 90, 0.5)'
     }}
     bg={'rgba(15, 73, 90, 0.667)'}>
      Track Bus
     </Flex>
      <Flex fontSize={'sm'}
      mt={'15px'} 
      bg={'orangered.400'}
      border={'2px solid'}
      px={'17px'}
      fontWeight={'500'}
      borderColor={'gray.600'}
      borderRadius={'50px'}
      py={'5px'}
      cursor={'pointer'}
      _hover={{
        bg:'gray.400',
      }}
      _focus={{
        bg:'gray.400',
      }}
      boxShadow={'2px 2px 14px 2px'}
      >
        See about Bus
      </Flex>
    </Flex>
   </Flex>
  )
}

export default Infomodel