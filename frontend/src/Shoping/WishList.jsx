import React, { useContext, useEffect } from 'react'
import { Storage } from '../Context/StateStore'
import TitleBanner from '../Component/TitleBanner'
import NavBar from '../Component/NavBar'
import { useNavigate } from 'react-router'
import { hostname } from '../App'
import axios from 'axios'

const WishList = () => {
    let navigate=useNavigate()
    const { wishList,user, setwishlist,userSet ,setshowmain} = useContext(Storage)
    useEffect(() => {
       
        const user=JSON.parse(sessionStorage.getItem('user'))
        axios.get(`${hostname}/api/wishList/${user}`).then((response)=>{
            setwishlist(response.data)
           }).catch((error)=>{console.log(error);})
    },[])
    let wishlisting = (e,pid) => {
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
    return (
        <div className='poppins'>
            <NavBar />
            {/* Banner  */}
            <TitleBanner name="Wishlist" page="WishList" />
            {/* Product to show */}
            {wishList != undefined && wishList != null && wishList.length>0? <>

                <div className='container mx-auto'>
                    {
                        wishList.map((x) => {
                            return (
                                <div className='p-4 border-1 justify-around items-center flex flex-wrap rounded my-2 shadow'>
                                    <img onClick={()=>{navigate(`/shop/${x._id}`)}} className='h-[100px] w-[100px] object-contain ' width={160} src={x.mainImage} alt="image" />
                                    <div className='w-[200px] bg-white'>
                                       <p className='text-xl text-center fw-semibold'> Product Name  
                                       <span className='block fw-light'>{x.productName} </span> </p>
                                    </div>
                                    <div className=' bg-white'>
                                        <p className='text-xl  text-center fw-semibold'>Price 
                                        <span className='block fw-light'>{x.price} </span></p>
                                    </div>
                                        <button className='p-2 px-3 rounded bg-blue-400 text-white'>Add to the Cart</button>
                                        {/* Close button */}
                                        <button onClick={(e)=>wishlisting(e,x._id)} className=''> 
                                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
</svg>
                                        </button>
                                </div>
                            )
                        })
                    }
                </div>
            </> : <div className='h-[20vh] flex'>
                <p className='text-center m-auto'>Nothing is added in the Wishlist</p>
            </div>
            }

        </div>
    )
}
export default WishList
