import React from 'react'
import { useRecoilValue } from 'recoil'
import authatom from './authatom'
import Register from '../auth/register'
import Login from '../auth/login'

const Template = () => {
  
    const authstate=useRecoilValue(authatom)
  
    return (
    <div>{
        authstate === "login" ? <Login/> : <Register/>
        }</div>
  )
}

export default Template