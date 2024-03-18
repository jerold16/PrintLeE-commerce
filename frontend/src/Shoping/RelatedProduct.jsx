import React from 'react'
import ProductCard from '../Component/ProductCard'
import { categories } from '../Component/Data'

const RelatedProduct = () => {

  return (
    <div>
        <p className='text-center poppins text-2xl  '>Related Products</p>
        <div className='flex flex-wrap mx-auto my-5 gap-3 container '>
        {
           categories.map((value)=>{
            return(
                <ProductCard type='related' value={value}/>
            )
           }) 
        }
        </div>
        
    </div>
  )
}

export default RelatedProduct