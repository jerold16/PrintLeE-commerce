import React from 'react'
import { useNavigate } from 'react-router'

const TitleBanner = (props) => {
    let navigate=useNavigate()
    let {name,page}=props
   
  return (
    <div>
        <div className='relative'>
            <img className='h-[50vh] object-cover w-full' src={require('../Assest/shopBanner.jpg')} alt="ShopBanner" />
            <div style={{backgroundColor:'rgba(0,0,0,0.4)'}} className='absolute flex flex-col align-items-center justify-center w-100 h-100 top-0'>
                <h4 className=' text-3xl sm:text-7xl lg:text-5xl text-white poppins'>{page!=undefined? `${page}`:`Shop`} </h4>
                <p className='text-slate-50'><span onClick={()=>navigate('/')} 
                className='cursor-pointer hover:underline text-xl hover:text-purple-500'>Home page</span> {" > "} {page!=undefined ? `${page}`:`${name}`} </p> 
            </div>
        </div>
        


    </div>
  )
}

export default TitleBanner