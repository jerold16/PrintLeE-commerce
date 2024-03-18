import React from 'react'
import NavBar from '../Component/NavBar'
import TitleBanner from '../Component/TitleBanner'
import Product from './Product'
import Filter from './Filter'
import Footer from '../Component/Footer'

const Shop = () => {
  return (
    <section id='home' className=''>
        <NavBar/>
        <TitleBanner/>
        <div className='flex '>
            <Filter/>
            <Product className="flex-1"/>
        </div>
        <Footer/>
        

    </section>
  )
}

export default Shop