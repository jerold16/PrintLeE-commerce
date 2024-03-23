import React from 'react'
import { Navbar } from 'react-bootstrap'
import NavbarCom from '../Components/Navbar'
import ShortCutReport from '../Components/ShortCutReport'

const Dashboard = () => {
  
  return (
    <div className='min-h-[100vh] bg-slate-50 '>
        <NavbarCom/>
        {/* Shortcut keys */}
        <ShortCutReport/>
        
    </div>
  )
}

export default Dashboard