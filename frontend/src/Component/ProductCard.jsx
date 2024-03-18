import React from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useNavigate } from 'react-router';

const ProductCard = ({value,name,type}) => {
  let navigate=useNavigate()
    const renderTooltip = (props) => (
        <Tooltip className='bg-white' id="button-tooltip" {...props}>
          WishList
        </Tooltip>
      );
  return (
    <div onClick={()=>navigate(`/shop/Phone_case`)} className={` ${name=='product'? 'w-[20rem]  m-3 h-[20rem] mx-auto  shadow': type==='related'? 'w-[10rem] sm:w-[15rem] mx-auto h-fit pb-2 bg-white ': 'min-h-[35rem] md:min-h-[20rem] lg:min-h-[29rem]'}  hover:scale-105 hover:bg-white transition duration-500 rounded-3xl hover:shadow relative cursor-pointer`}>
    <img src={value.img} className={`rounded-3xl ${name=='product'? 'w-100 h-52 object-cover mx-auto ':''} `} alt="image" />
    <p className="text-center mt-3">Name : {value.name} </p>
    <p className="text-center">Price : ₹ {value.price} </p>
    <div className="absolute top-0 p-6 flex flex-col justify-between w-100 opacity-hover h-100 ">
      <div>
      <OverlayTrigger
      placement="right"
      delay={{ show: 15, hide: 10 }}
      overlay={ <Tooltip className='rounded ' id="tooltip">
      Wishlist
    </Tooltip>}
    >
        <p className="p-2 flex  bg-slate-50 hover:bg-blue-700 rounded-full w-fit text-slate-950 hover:text-white">
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
      </div>
      {/* <button className="p-2 h-fit w-fit px-4 text-lg mx-auto bg-black text-white rounded-full">
        Personalize
      </button> */}
    </div>
  </div>
  )
}

export default ProductCard