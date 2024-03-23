import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import { hostname } from '../App'
import { Storage } from '../Context/StateStore'
import UserLogin from '../User/Login'

const WishlistButton = (props) => {
  const { showmain, wishList, setwishlist, setshowmain, userSet } = useContext(Storage)
  const { pid } = props
  const user = JSON.parse(sessionStorage.getItem('user'))
  console.log(wishList);
  useEffect(() => {
    userSet()
    axios.get(`${hostname}/api/wishList/${user}`).then((response)=>{
      setwishlist(response.data)
     }).catch((error)=>{console.log(error);})
  }, [user])
  let wishlisting = () => {
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

  console.log(pid);
  return (
    <div>


      <div>
        <OverlayTrigger
          placement="right"
          delay={{ show: 15, hide: 10 }}
          overlay={<Tooltip className='rounded d-none d-sm-block z-2' id="tooltip">
            Wishlist
          </Tooltip>}>
          <p onClick={wishlisting} className={`p-2 flex rounded-full w-fit
          ${wishList !== undefined && wishList.some(obj => obj._id === pid) ? 'bg-amber-400 text-slate-50' :
              'bg-slate-50 sm:hover:bg-blue-500  w-fit text-slate-950 sm:hover:text-white'}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-star"
              viewBox="0 0 16 16"
            >
              <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
            </svg>{" "}
          </p>
        </OverlayTrigger>
        <UserLogin />
      </div>

    </div>
  )
}

export default WishlistButton
