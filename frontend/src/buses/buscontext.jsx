

import React, { createContext, useState } from 'react'
 
export const buscontext=createContext()



const BusContext = ({children}) => {
    const [allbuses,setallbuses]=useState(null)
    const [filteredbuses,setfilteredbuses]=useState(null)
    const [searchmodel,setsearchmodel]=useState(false)
    const [searchinput,setsearchinput]=useState('')
    const [headerbus,setheaderbus]=useState(null)
    const [isopen,setisopen]=useState(false)
    const [busmodel,setbusmodel]=useState(false)
     
    return (
    <buscontext.Provider value={{allbuses,setallbuses,
        filteredbuses,setfilteredbuses,
        searchmodel,setsearchmodel,
        searchinput,setsearchinput,
        headerbus,setheaderbus,
        isopen,setisopen,
        busmodel,setbusmodel
    }}>
        {children}
        </buscontext.Provider>
  )
}

export default BusContext