import React from 'react'
import { Route, Routes } from 'react-router'
import Allproduct from './Products/Allproduct'
import AddProduct from './Products/AddProduct'

const Product = () => {
  return (
    <div>
        <Routes>
            <Route path='/*' element={<Allproduct/>}/>
            <Route path='/addproduct' element={<AddProduct/>}/>

        </Routes>

    </div>
  )
}

export default Product