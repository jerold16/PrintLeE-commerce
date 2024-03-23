import React from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import WishlistButton from './WishlistButton';

const ProductCard = ({value,name,type}) => {
  let navigate=useNavigate()
    const renderTooltip = (props) => (
        <Tooltip className='bg-white' id="button-tooltip" {...props}>
          WishList
        </Tooltip>
      );
      let change=()=>{
        if(name=='product')
          navigate(`/shop/`)
      }
  return (
    <div  className={` ${name=='product'? '  w-[20rem]  m-3 h-[20rem] mx-auto  shadow': 
    type==='related'? 'w-[10rem] sm:w-[15rem] mx-auto min-h-[15rem] pb-2 bg-white ': 
    'min-h-[35rem] md:min-h-[20rem] lg:min-h-[29rem]'} 
    showishlist hover:scale-105 hover:bg-white transition duration-500 rounded-3xl hover:shadow relative cursor-pointer`}>
    <img onClick={()=>{
      navigate(`/shop/${value._id}`); }} src={value.mainImage} 
      className={`rounded-3xl h-[15rem] object-contain
      ${name=='product'? 'w-100 object-contain mx-auto ':
      type==='related'? 'w-[10rem] sm:w-[15rem] mx-auto h-[9rem] lg:h-[13rem]  pb-2  ': 
      ' object-contain'} `} alt="image" />
    <p className="text-center mt-3">Name : {value.productName} </p>
    <p className="text-center">Price : ₹ {value.price} </p>
    <div className="absolute  top-0 p-6 flex flex-col justify-between opacity-hover  ">
      <WishlistButton pid={value._id} />
      {/* <button className="p-2 h-fit w-fit px-4 text-lg mx-auto bg-black text-white rounded-full">
        Personalize
      </button> */}
    </div>
  </div>
  )
}

export default ProductCard