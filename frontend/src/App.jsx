import { Button } from "@chakra-ui/react"
import Header from "./components/header"
import { Navigate, Route, Routes } from "react-router-dom"
import Template from "./atoms/tempelate"
import { useRecoilValue } from "recoil"
import useratom from "./atoms/useratom"
import Profile from "./auth/profile"
import Maincomponent from "./components/maincomponent"



function App() {
    

 const useratom1=useRecoilValue(useratom) 

  return (
    <>
     <Routes>
      <Route path="/auth" element={!useratom1 ? <Template/> : 
     <Navigate to={'/'}/>} />
      <Route path='/' element={useratom1 ? <Maincomponent/> : 
    <Navigate to={'/auth'}/> } />
    <Route path="/profile" element={<Profile/>}/>
      <Route  path="/:id" element={''}/>
      </Routes> 
    </>
  )
}

export default App
