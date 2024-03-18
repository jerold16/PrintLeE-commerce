import React from 'react'
import AdminLogin from './Login'

const Protect = ({Child}) => {
    let admin=sessionStorage.getItem('admin')
    let verify=()=>{
        if(admin==null){
            return false
        }
        else{
        return true
    }}
  return (
    <div>
        {
            verify() ? <Child/> : <AdminLogin/>
        }

    </div>
  )
}

export default Protect