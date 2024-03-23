import React, { useEffect, useState } from 'react'
import TitleBanner from '../Component/TitleBanner'
import { useParams } from 'react-router'
import NavBar from '../Component/NavBar'
import axios from 'axios'
import { hostname } from '../App'

const Brands = () => {
    const { category } = useParams()
    const [Brand, setbrands] = useState()
    useEffect(() => {
        axios.get(`${hostname}/api/brandCategory/${category}`).then((response) => {
            setbrands(response.data)
        }).catch((error) => {
            console.log(error);
        })
    }, [category])
    return (
        <div className='poppins'>
            <NavBar />
            <TitleBanner page={category} />
            <h5 className='text-center my-10 text-3xl'>Brands under {category} </h5>
            {
                Brand != undefined && Brand.length>0 ?

                    <div className='flex justify-between container mx-auto my-10 flex-wrap gap-3'>
                       
                        { Brand.map((x) => {

                                return (
                                    <div className='cursor-pointer hoverbtn border-1 border-slate-950'>
                                        <img className='w-[100px] h-[100px] object-contain ' src={x.image} alt="logo" />
                                    </div>
                                )
                            })
                        }
                    </div> : <div className='my-10'>
                        <p className='text-center'>No Brand is found under the category</p>
                    </div>
            }


        </div>
    )
}

export default Brands
