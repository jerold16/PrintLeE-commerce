import React, { useEffect, useState } from 'react'
import ProductCard from '../Component/ProductCard'
import { categories } from '../Component/Data'
import axios from 'axios'
import { hostname } from '../App'
import Loading from '../Component/Loading'

const RelatedProduct = (props) => {
  const { category } = props
  console.log(category);
  const [relatedProduct, setrelated] = useState()
  useEffect(() => {
    axios.get(`${hostname}/api/productCategory?category=${category}`).then((response) => {
      setrelated(response.data)
    }).catch((error) => console.log(error))
  }, [])
  return (
    <div>
      {
        relatedProduct != null ? <>
          <p className='text-center poppins text-2xl  '>Related Products</p>
          <div className='flex flex-wrap mx-auto my-5 gap-3 container '>
            {
              relatedProduct.slice(0,4).map((value) => {
                return (
                  <ProductCard type='related' value={value} />
                )
              })
            }
          </div>
        </> : <Loading />
      }
    </div>
  )
}

export default RelatedProduct