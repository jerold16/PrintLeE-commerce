import React, { useContext, useEffect, useState } from 'react'
import NavbarCom from '../../Components/Navbar'
import { StateStore } from '../../Context/StateProvider'
import axios from 'axios'
import { hostName } from '../../App'
import { useParams } from 'react-router'
import Loading from '../../Components/Loading'
import MainImageModal from '../../Components/MainImageModal'

const EditProduct = () => {
    const { id } = useParams()
    let [editMainImagemodal, setMainImagemodal] = useState(false)
    let { brandDB, categoryDB, } = useContext(StateStore)
    let [url,seturl]=useState()
    let [name,setname]=useState()
    //get a particular product
    let getParticularProduct = () => {
        axios.get(`${hostName}/api/productID?id=${id}`).then((response) => {
            console.log(response.data);
            setProduct(response.data)
        }).catch((error) => {
            console.log(error);
        })
    }
    useEffect(() => {
        getParticularProduct()
    }, [])
    let admin = JSON.parse(sessionStorage.getItem('admin'))
    const [product, setProduct] = useState({
        productName: "",
        price: 0,
        quantity: 0,
        description: "",
        category: "",
        vatriety: "",
        brand: "",
        modelName: "",
        mainImage: null,
        pictures: null
    })
    const handleChanges = (e) => {
        let { value, name } = e.target
        if (name == 'mainImage')
            value = e.target.files
        if (name == 'pictures')
            value = e.target.files
        setProduct((prev) => ({
            ...prev, [name]: value
        }))
    }
    let validateForm = () => {
        if (product.productName == "") {
            document.getElementById('producterror').innerHTML = "* Enter the Product name"
        }
        else {
            document.getElementById('producterror').innerHTML = ""

        }
        if (product.price == 0) {
            document.getElementById('priceerror').innerHTML = "* Enter the price"
        }
        else {
            document.getElementById('priceerror').innerHTML = ""

        }
        if (product.quantity == 0) {
            document.getElementById('quantityerror').innerHTML = "* Enter the quantity"
        }
        else {
            document.getElementById('quantityerror').innerHTML = ""

        }
    }
    let postvalue = (e) => {
        e.preventDefault()
        if (product.productName != "" && product.price != 0 && product.quantity != 0) {
            console.log(product.mainImage);
            document.getElementById('producterror').innerHTML = ""
            document.getElementById('priceerror').innerHTML = ""
            document.getElementById('quantityerror').innerHTML = ""
            document.getElementById('mainimageerror').innerHTML = ""
            axios.put(`${hostName}/api/product/${id}`, product).then((response) => {
                console.log(response.data);
                alert("Product has been Updated")
                getParticularProduct()
            }).catch((error) => {
                console.log(error);
            })
        }
        else
            validateForm()
    }
    return (
        <div className='poppins min-h-[90vh] bg-slate-50'>
            <NavbarCom />
            {
                product != undefined && product.imageUrl != undefined ? <>

                    <div className='container bg-white mx-auto p-3 rounded '>
                        <div className='flex justify-between items-center'>
                            <p className='fw-medium text-lg'>Update Product</p>
                            <button onClick={postvalue} className='rounded bg-violet-600 text-white p-3'>Update</button>
                        </div>
                        <article className='flex my-4 flex-wrap gap-3 justify-between'>

                            <div className=' w-[400px]'>
                                Product Name <span id='producterror' className='text-red-600'>*</span>
                                <input name='productName' value={product.productName} onChange={handleChanges} type="text" placeholder='Enter the Product name' style={{ backgroundColor: "#f6f6f6" }} className='p-3 w-full  block my-2 px-3 border-0  rounded outline-none' />
                            </div>
                            <div className='w-[400px]'>
                                Price <span id='priceerror' className='text-red-600'>*</span>
                                <input type="number" value={product.price} onChange={handleChanges} name='price' placeholder='Enter the price ' style={{ backgroundColor: "#f6f6f6" }} className='p-3 w-full block my-2 px-3 border-0  rounded outline-none' />
                            </div>
                            <div className='w-[400px] '>
                                Quantity <span id='quantityerror' className='text-red-600'>*</span>
                                <input type="number" value={product.quantity} onChange={handleChanges} name='quantity' placeholder='Enter the Product name ' style={{ backgroundColor: "#f6f6f6" }} className='p-3 block w-full my-2 px-3 border-0  rounded outline-none' />
                            </div>
                            <div className=' w-[400px]'>
                                Model Name
                                <input name='modelName' value={product.modelName} onChange={handleChanges} type="text" placeholder='Enter the Model name' style={{ backgroundColor: "#f6f6f6" }} className='p-3 w-full  block my-2 px-3 border-0  rounded outline-none' />
                            </div>
                            <div className='w-[400px] '>
                                Variety
                                <input type="text" value={product.vatriety} onChange={handleChanges} name='vatriety' placeholder='Enter the Product name ' style={{ backgroundColor: "#f6f6f6" }} className='p-3 block w-full my-2 px-3 border-0  rounded outline-none' />
                            </div>
                            <div className='w-[400px]'>
                                Category
                                <select onChange={handleChanges} value={product.category} name='category' type="text" placeholder='Enter the Product name' style={{ backgroundColor: "#f6f6f6" }} className='p-3 w-full  block my-2 px-3 border-0  rounded outline-none' >
                                    <option value="">Select</option>
                                    {
                                        categoryDB != undefined ? <>{
                                            categoryDB.map((x) => {
                                                return (
                                                    <option value={x.category}>{x.category} </option>
                                                )
                                            })
                                        } </> : ""
                                    }
                                </select>
                            </div>
                            <div className='w-[400px]'>
                                Brand
                                <select name='brand' onChange={handleChanges} value={product.brand} placeholder='Enter the Product name ' style={{ backgroundColor: "#f6f6f6" }} className='p-3 w-full block my-2 px-3 border-0  rounded outline-none' >
                                    <option value={null}>select </option>
                                    {
                                        brandDB != undefined ? <>{
                                            brandDB.map((x) => {
                                                return (
                                                    <option value={x.brand}>{x.brand} </option>
                                                )
                                            })
                                        } </> : ""
                                    }

                                </select>
                            </div>

                            <div className='w-[400px] '>
                                Main Image <span id='mainimageerror' className='text-red-600'>* </span>
                                
                                    <img onClick={()=>{seturl(product.mainImage);setname('MI'); setMainImagemodal(true)}} className='w-40 hover:scale-105 object-contain border-1 transition duration-500 h-40 cursor-pointer' src={product.mainImage} alt="product" /> 
                               </div>
                            <div className='w-full '>
                                Sub Images <span id='suberror' className='text-red-600' >*</span>
                                <div className='w-full my-2 flex flex-wrap '>
                                {
                                    product.imageUrl.map((x) => {
                                        return (
                                            <img onClick={()=>{setname('SI');seturl(x);setMainImagemodal(true)}} className='w-40 hover:scale-105 transition duration-500 border-1 m-1 h-40 object-contain cursor-pointer ' src={x} alt="image" />
                                        )
                                    })
                                }
                                            <img onClick={()=>{setname('add');setMainImagemodal(true)}} className='w-40 hover:scale-105 transition duration-500 border-1 m-1 h-40 object-contain cursor-pointer ' src={require('../../Assest/addimage.jpg')} alt="image" />
                                </div>

                            </div>
                        </article>
                        <div className=''>
                            <p>Description</p>
                            <textarea value={product.description} style={{ backgroundColor: "#f6f6f6" }} name="description" onChange={handleChanges} placeholder='Enter the Description for the Product'
                                className='border-slate-100 outline-none w-full border-1 p-3' id="" cols="30" rows="10"></textarea>

                        </div>
                    </div>
                    <MainImageModal url={url} type={name} fn={getParticularProduct} show={editMainImagemodal} pid={id} setshow={setMainImagemodal} />
                </> : <Loading />
            }
        </div >
    )
}

export default EditProduct