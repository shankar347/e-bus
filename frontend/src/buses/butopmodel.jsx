import { Flex, Text } from '@chakra-ui/react'
import React from 'react'

const Butopmodel = ({bus}) => {

  
    console.log(bus)
    
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

        

    return (
    <Flex 
    w={{
        md:'200px',
        base:'170px',
        sm:'170px'
    }}
    h={{
        md:'100px',
        lg:'100px',
        base:'80px'
    }}
    fontFamily={'sans-serif'}
    bg={' rgba(15, 73, 90, 0.667)'}
    px={{
        md:'10px',
        lg:'10px',
        base:'5px'
    }}
    py={'5px'}
    flexDir={'column'}
    borderRadius={'5px'}
    >
    <Flex gap={'3px'}>
    <Text fontSize={'xl'}>
       {bus?.busnumber}
    </Text>
    <Text fontFamily={'sans-serif'} 
    fontSize={'sm'}
    alignSelf={'center'}
     px={'3px'}
     borderRadius={'3px'}
     backgroundColor={bus?.bustype === "delux" ? "orangered" : 'gray.300'}>
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
    fontWeight={'600'}>
     <Text>
  {bus?.route.start}
    </Text>
         -
       <Text>
        { bus?.route?.destination.length > 8 ? bus?.route?.destination.slice(0,8) + '...'
        : bus?.route?.destination }
        </Text>   
      
    </Flex>
     <Flex 
      mt={{
        md:'5px',
        lg:'5px',
        base:'3px',
        sm:'3px'
      }}
      fontSize={{
        md:'md',
        lg:'md',
        sm:'sm'
    }}
     gap={'5px'}>
        <Text>
            Travel time:
        </Text>
        <Text>
        {timedifference.hours > 0 ? timedifference.hours + "h" + " "+
        + timedifference.minutes + "m"  : timedifference.minutes + "m"}
        </Text>
     </Flex>
    </Flex>
  )
}

export default Butopmodel