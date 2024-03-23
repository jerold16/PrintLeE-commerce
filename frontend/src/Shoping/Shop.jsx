import React, { useContext } from 'react'
import NavBar from '../Component/NavBar'
import TitleBanner from '../Component/TitleBanner'
import Product from './Product'
import Filter from './Filter'
import Footer from '../Component/Footer'
import { Storage } from '../Context/StateStore'

const Shop = () => {
  let {Allproduct}=useContext(Storage)
  return (
    <section id='home' className=''>
        <NavBar/>
        <TitleBanner name='Shop'/>
        <div className='flex '>
            <Filter/>
            {
              Allproduct!=undefined ? <Product products={Allproduct} className="flex-1"/> : ''
            }
            
        </div>
        <Footer/>
        

    </section>
  )
}

export default Shop