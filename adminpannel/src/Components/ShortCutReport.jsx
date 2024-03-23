import React, { useContext } from 'react'
import { StateStore } from '../Context/StateProvider'
import { useNavigate } from 'react-router'

const ShortCutReport = () => {
    let navigate=useNavigate()
    let {allProductDb}=useContext(StateStore)
    return (
        <div className='flex justify-between'>
            <div className='rounded-xl poppins col-lg-9 h-fit    bg-white p-3'>
                <h5>Shortcut Report</h5>
                <div className='flex justify-between flex-wrap'>
                    {/* Card */}
                    <div className='bg-blue-50 rounded-2xl flex flex-col justify-around p-4 h-[250px] w-[220px] '>
                        <div className='rounded-full w-fit text-white p-2 mb-3 bg-blue-400  '>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-currency-rupee" viewBox="0 0 16 16">
                                <path d="M4 3.06h2.726c1.22 0 2.12.575 2.325 1.724H4v1.051h5.051C8.855 7.001 8 7.558 6.788 7.558H4v1.317L8.437 14h2.11L6.095 8.884h.855c2.316-.018 3.465-1.476 3.688-3.049H12V4.784h-1.345c-.08-.778-.357-1.335-.793-1.732H12V2H4z" />
                            </svg>
                        </div>
                        345
                        <p className='block'>Total Sells online</p>
                    </div>
                    {/* Product list */}
                    <div onClick={()=>navigate('/product/')} className='bg-amber-50 cursor-pointer hover:scale-105 transition duration-500 rounded-2xl flex flex-col justify-around p-4 h-[250px] w-[220px] '>
                        <div className='rounded-full w-fit text-white p-2 mb-3 bg-amber-400  '>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-archive-fill" viewBox="0 0 16 16">
                                <path d="M12.643 15C13.979 15 15 13.845 15 12.5V5H1v7.5C1 13.845 2.021 15 3.357 15zM5.5 7h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1M.8 1a.8.8 0 0 0-.8.8V3a.8.8 0 0 0 .8.8h14.4A.8.8 0 0 0 16 3V1.8a.8.8 0 0 0-.8-.8z" />
                            </svg>
                        </div>
                        {allProductDb!=undefined? allProductDb.length: '0'}
                        <p className='block'> Products Added</p>
                    </div>
                    <div className='bg-green-50 flex flex-col justify-around rounded-2xl p-4 h-[250px] w-[220px] '>
                        <div className='rounded-full w-fit text-white p-2 mb-3 bg-green-400  '>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                                <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                            </svg>    </div>
                        40
                        <p className='block'> Users registered</p>
                    </div>
                    <div className='bg-red-50 flex flex-col justify-around rounded-2xl p-4 h-[250px] w-[220px] '>
                        <div className='rounded-full w-fit text-white p-2 mb-3 bg-red-400  '>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-body-text" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M0 .5A.5.5 0 0 1 .5 0h4a.5.5 0 0 1 0 1h-4A.5.5 0 0 1 0 .5m0 2A.5.5 0 0 1 .5 2h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m9 0a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m-9 2A.5.5 0 0 1 .5 4h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m5 0a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m7 0a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m-12 2A.5.5 0 0 1 .5 6h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5m8 0a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m-8 2A.5.5 0 0 1 .5 8h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m7 0a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-7 2a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 0 1h-8a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5" />
                            </svg>
                        </div>
                        10
                        <p className='block'> Orders placed</p>
                    </div>
                </div>
            </div>
            {/* Recent orders */}
            <div className='  bg-white p-4 mx-auto rounded-xl '>
                <h5>Recent orders</h5>
                <table className='border-1 '>
                    <tr className='border-1'>
                        <th className='p-3 border-1'>Name</th>
                        <th className='p-3'>
                            Amount
                        </th>
                    </tr>
                    <tr className='border-1'>
                       <td className='p-3 border-1'>
                           Md Hari
                           <span className='block'>123456789</span>
                       </td>
                       <td className='p-3 border-1'>454 </td>
                    </tr>
                    <tr className='border-1'>
                       <td className='p-3 border-1'>
                           Md Hari
                           <span className='block'>123456789</span>
                       </td>
                       <td className='p-3 border-1'>454 </td>
                    </tr>
                    <tr className='border-1'>
                       <td className='p-3 border-1'>
                           Md Hari
                           <span className='block'>123456789</span>
                       </td>
                       <td className='p-3 border-1'>454 </td>
                    </tr>
                </table>

            </div>
        </div>
    )
}

export default ShortCutReport
