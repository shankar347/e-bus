import React, { useEffect, useState } from 'react';

const MapIframe = () => {
 
    const [mapurl,setmapurl]=useState('')
    const defaultlocation={lat: 37.7749, lng: -122.4194}

    const getuserlocation=(callback)=>{
     if(navigator.geolocation)
        {
         navigator.geolocation.getCurrentPosition((curentposition)=>{
          callback(curentposition.coords.latitude
            ,curentposition.coords.longitude)
         },(err)=>{
            console.error('Error getting Location',err)
            callback(defaultlocation.lat,defaultlocation.lng)
         })
        }
      else
      {
        console.error('Geolocation is not supported by this browser')
        callback(defaultlocation.lat,defaultlocation.lng)
      }  
    }

    const generateurl=(latitude,longitude)=>{
     return  `https://www.google.com/maps/embed/v1/view?key=YOUR_GOOGLE_MAPS_API_KEY&center=${latitude},${longitude}&zoom=14&maptype=roadmap`;
    }   
    
    useEffect(()=>{
   getuserlocation((latitude,longitude)=>{
     const url=generateurl(latitude,longitude)
     setmapurl(url)
   })
    },[])
    

  return (
    <div style={{ width: '100%', height: '400px' }}>
      <iframe
        width="100%"
        height="100%"
        id='map'
        src={mapurl}   
      ></iframe>
    </div>
  );
};

export default MapIframe;
