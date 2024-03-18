import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
import { hostName } from '../App'

export const StateStore=createContext(null)
const StateProvider = (props) => {
    const user="jbsgbawbi"
    const [allProductDb,setAllProduct]=useState([])
    const [brandDB,setbrand]=useState()
    const [categoryDB,setCategory]=useState()
    const [apiCalling,setApi]=useState(false)
    const adminStorage={user,brandDB,categoryDB,apiCalling,setApi,allProductDb,setAllProduct}
    useEffect(() => {
      setApi(false)
      window.scrollTo(0,0)
      async function fetchdata() {
        try {
          const response = await axios.get(`${hostName}/api/product`);
          const category= await axios.get(`${hostName}/api/category`);
          const brand=await axios.get(`${hostName}/api/brand`);
          setbrand(brand.data)
          setAllProduct(response.data);
          setCategory(category.data);
          setApi(true)
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
      fetchdata();
    }, []);
  return (
    <StateStore.Provider value={adminStorage}>
         {props.children}
    </StateStore.Provider>
  )
}

export default StateProvider