import React, { useState } from 'react'

const FilterBar = () => {
    let categoryList=[
        'Mobile Case','Cup','Tshirt','Book'
    ]
    let [selectedcolor,setselectedcolor]=useState([])
    let handlecolor=(clr)=>{
        setselectedcolor((prev)=>{
            if(prev.indexOf(clr)>-1)
              return  prev.filter((color)=>  color!==clr)
            else
               return [...prev,clr]})
    }
  return (
    <div>
        {/* Search box */}
        <div className='shadow poppins my-5 bg-slate-50 m-2 rounded-3xl e w-[20rem] p-4'>
        <h5>Search</h5>
        <div className=' p-2 px-3 my-1 items-center w-fit rounded-full border-1 flex outline-none focus-within:border-violet-700'>
            <input className='outline-none border-0 bg-transparent' type="text" />
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
</svg>
        </div>

       </div>
       {/* Product Category  */}
       <div className='shadow my-5 bg-slate-50 poppins m-2 rounded-3xl e w-[20rem] p-4' >
        <h5 className='mb-4'>Product Categories</h5>
        {
            categoryList.map((value)=>{
                return(
                    <p className='cursor-pointer  text-slate-600 w-fit hover:text-violet-600 '>{value} </p>

                )
            })
        }
       </div>
       {/* Filter price */}
       <div className={`shadow my-5 bg-slate-50 poppins m-2 rounded-3xl e w-[20rem] p-4`}>
          <h5>Filter by price</h5>
          <input type="range" value="" />

       </div>
       {/* Products */}
       <div className={`shadow my-5 bg-slate-50 poppins m-2 rounded-3xl e w-[20rem] p-4`}>
           <h5>Products</h5>
           <div className='flex my-2'>
            <img className='w-20' src={require('../Assest/badge.png')} alt="" />
            <div className='w-fit ms-1'>
                <p>Badge</p>
                <p>&#8377; 234 </p>

            </div>
           </div>
              

       </div>
       {/* Filter by color */}
       <div  className={`shadow my-5 bg-slate-50 poppins m-2 rounded-3xl e w-[20rem] p-4`}>
            <h5>Filter by Color</h5>
            <div className='flex justify-around gap-2 mt-4'>
                {/* Colors red */}
             <div onClick={()=>handlecolor('red')} 
               className={`${selectedcolor.includes('red')?'border-black border-2  p-1':'border-0'}  rounded-full cursor-pointer `}>
                <p className={`${selectedcolor.includes('red')?'w-5 h-5 ':'w-8 h-8'} mb-0 rounded-full  bg-red-600 border-0 `}></p>           
            </div>
               {/* Colors yellow */}
               <div onClick={()=>handlecolor('yellow')} 
               className={`${selectedcolor.includes('yellow')?'border-black border-2  p-1':'border-0'}  rounded-full cursor-pointer `}>
                <p className={`${selectedcolor.includes('yellow')?'w-5 h-5 ':'w-8 h-8'} mb-0 rounded-full  bg-yellow-600 border-0 `}></p>           
            </div>
               {/* Colors blue */}
               <div onClick={()=>handlecolor('blue')} 
               className={`${selectedcolor.includes('blue')?'border-black border-2  p-1':'border-0'}  rounded-full cursor-pointer `}>
                <p className={`${selectedcolor.includes('blue')?'w-5 h-5 ':'w-8 h-8'} mb-0 rounded-full  bg-blue-600 border-0 `}></p>           
            </div>
            {/* Colors pink */}
            <div onClick={()=>handlecolor('pink')} 
               className={`${selectedcolor.includes('pink')?'border-black border-2  p-1':'border-0'}  rounded-full cursor-pointer `}>
                <p className={`${selectedcolor.includes('pink')?'w-5 h-5 ':'w-8 h-8'} mb-0 rounded-full  bg-pink-400 border-0 `}></p>           
            </div>
             {/* Colors black */}
             <div onClick={()=>handlecolor('black')} 
               className={`${selectedcolor.includes('black')?'border-black border-2  p-1':'border-0'}  rounded-full cursor-pointer `}>
                <p className={`${selectedcolor.includes('black')?'w-5 h-5 ':'w-8 h-8'} mb-0 rounded-full  bg-slate-950 border-0 `}></p>           
            </div>
          

            </div>  
       </div>
    </div>
  )
}

export default FilterBar