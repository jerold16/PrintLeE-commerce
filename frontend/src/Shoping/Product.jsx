import React, { useContext, useEffect, useMemo, useState } from 'react'
import ReactPaginate from 'react-paginate'
import ProductCard from '../Component/ProductCard'
import { Storage } from '../Context/StateStore'
import Loading from '../Component/Loading'

const Product = (props) => {
  let {products}=props
    
    let data=products!=undefined? [...products]:[]
    const [itemOffset, setItemOffset] = useState(0);
    const [currentItems,setcurrentItems]=useState([]);
    const [pageCount,setPageCount] =useState(0);
    const itemsPerPage=20;
    useEffect(()=>{
        const endOffset = itemOffset + itemsPerPage;
        setcurrentItems(data.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(data.length / itemsPerPage));
    },[itemOffset])
    useEffect(()=>{
        window.scrollTo(0,0);
    },[])
    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % data.length;
      setItemOffset(newOffset);
      window.scroll(0,0)
    };   
    
  return (
    <div className='w-full'>
      {
        products!=null?<>
       
        <div className='flex items-center min-h-[15vh] justify-between px-3'>
            <p className='poppins mb-0 ms-3' >Showing {itemOffset+1}-{itemOffset+currentItems.length} of {data.length} results</p>
            <select name="sorting" className=' border-0 bg-slate-50 outline-none p-3 w-[180px]  rounded-full ' id="">
                <option value="">Default Sorting</option>
                <option value="">Sort By Lastest</option>
                <option value="">Sort by price : Low to High</option>
                <option value="">Sort by price : High to Low</option>

            </select>
        </div>
        <div id='productSection' className='flex flex-wrap gap-3 mb-5 justify-between'>
        {
            currentItems.map((value,index)=>{
                return(
                  <ProductCard value={value} name={'product'} />
                )
            })
        }

        </div>
         <ReactPaginate
          breakLabel="..."
          nextLabel=">>"
          onPageChange={handlePageClick}
          pageRangeDisplayed={1}
          pageCount={pageCount}
          previousLabel="<<"
          containerClassName='pagination'
          pageLinkClassName='page-num'
          previousLinkClassName='page-num'
          nextLinkClassName='page-num'
          activeLinkClassName='active'
        /> </> : <Loading/>
      }
    </div>
  )
}

export default Product