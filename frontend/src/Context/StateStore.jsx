import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
import { hostname } from '../App'

export const Storage=createContext()
const StateStore = (props) => {
    const [showmain,setshowmain]=useState()
    const [Allproduct,setAllproduct]=useState()
    const [Allcaetgory,setcategory]=useState()
    const [user,setuser]=useState()
    const [wishList,setwishlist]=useState()
    let userSet=()=>{
        setuser(JSON.parse(sessionStorage.getItem('user')))
        axios.get(`${hostname}/api/wishList/${user}`).then((response)=>{
            setwishlist(response.data)
           }).catch((error)=>{console.log(error);})
    }
    let wishlisthandler = (e,pid) => {
        e.preventDefault()
        if (user != null) {
          const obj = {
            userId: user,
            productId: pid
          }
          axios.post(`${hostname}/api/addWishlist`, obj).then((response) => {
            console.log(response.data);
            userSet()
            alert(response.data.message)
    
          }).catch((error) => {
            console.log(error);
          })
        }
        else
          setshowmain(true)
      }
    useEffect(()=>{
        axios.get(`${hostname}/api/product`).then((response)=>{
            setAllproduct(response.data)
        }).catch((error)=>{console.log(error);})
        axios.get(`${hostname}/api/category`).then((response)=>{
            setcategory(response.data)
        }).catch((error)=>console.log(error))
    },[])
    const valueExport={Allproduct,wishList,wishlisthandler,setwishlist,Allcaetgory,userSet,user,setuser,showmain,setshowmain}
  return (
    <Storage.Provider value={valueExport}>
        {props.children}
    </Storage.Provider>
  )
}

export default StateStore
