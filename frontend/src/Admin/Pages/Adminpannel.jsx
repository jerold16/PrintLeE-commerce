import React from 'react'
import { Route, Routes } from 'react-router'
import AdminLogin from './AdminLogin'
import AdminDashboard from './AdminDashboard'

const Adminpannel = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<AdminLogin/>}/>
            <Route path='/dashboard' element={<AdminDashboard/>}/>
        </Routes>
    </div>
  )
}

export default Adminpannel