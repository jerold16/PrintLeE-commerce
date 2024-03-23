import React from 'react'
import { Route, Routes } from 'react-router'
import Allproduct from './Products/Allproduct'
import EditProduct from './Products/EditProduct'
import AddProduct from './Products/CreateProduct'

const Product = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Allproduct/>}/>
            <Route path='/addproduct' element={<AddProduct/>}/>
            <Route path='/:id' element={<EditProduct/>}/>
        </Routes>
    </div>
  )
}

export default Product