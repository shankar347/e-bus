import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Flex, Spinner, useToast } from '@chakra-ui/react';


delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const LeafletMapComponent = () => {
  const [position, setPosition] = useState(null); 
  const [error,seterror]=useState('')
  console.log(error)
  const toast=useToast()

  

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setPosition([latitude, longitude]);
          console.log('Successfully retrieved location:', latitude, longitude);
        },
        (err) => {
          console.error("Error getting location: ", err);
          toast({
            description:'Unable to retrive your location',
            status:'error',
            })
            seterror(err.message)
        }
        
      );
    }
    else
    {
        toast({
            description:'Geolocation is not supported by this browser'
            ,status:'error',
        })
        seterror('message')
    }

  }, [toast]);

 
  useEffect(() => {
    console.log('Updated position:', position);
  }, [position]);

  return (
   <div style={{position:'relative', zIndex:0}}>{
    position &&
    <MapContainer   key={`${position[0]}-${position[1]}`}
     center={position} zoom={13}
      style={{ height: "480px", width: "100%", position:'relative' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position}>
        <Popup>
          You are here.
        </Popup>
      </Marker>
    </MapContainer>
}
{
    !position && 
    <Flex w={'full'} justifyContent={'center'} h={'120px'}
    alignItems={'center'} >
      <Spinner/>
    </Flex>
}
    </div> 
  );
};

export default LeafletMapComponent
