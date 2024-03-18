import React from 'react'
import NavBar from '../Component/NavBar'
import TitleBanner from '../Component/TitleBanner'
import { useParams } from 'react-router'

const DesignerPage = () => {
    let {type}=useParams()

  return (
    <div>
        <NavBar/>
        <TitleBanner page='Design'/>


    </div>
  )
}

export default DesignerPage