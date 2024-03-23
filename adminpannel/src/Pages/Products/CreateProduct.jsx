import React, { useContext, useState } from 'react'
import NavbarCom from '../../Components/Navbar'
import { StateStore } from '../../Context/StateProvider'
import axios from 'axios'
import { hostName } from '../../App'

const AddProduct = () => {
  let { brandDB, categoryDB } = useContext(StateStore)
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
    
    console.log(name+" "+value);
    if (name == 'mainImage') {
      if (e.target.files[0].size > 500 * 1024) {
        e.preventDefault();
        document.getElementById('mainimageerror').innerHTML = "* Exceeded 500kb "
        e.target.value = ''
        value = null
      }
      else {
        document.getElementById('mainimageerror').innerHTML = "* "
        value = e.target.files
      }
    }
    if (name == 'pictures') {
      const files = e.target.files
      for (let i = 0; i < files.length; i++) {
        if (files[i].size > 500 * 1024) {
          document.getElementById('suberror').innerHTML = `* ${i == 0 ? '1st' : i == 1 ? '2nd' : i == 2 ? `3rd` : `${i + 1}th`} image Exceeds 500kb`
          e.target.value = ''
          value = null
        }
        else {
          document.getElementById('suberror').innerHTML = '*'
          value = e.target.files
        }
      }}

      setProduct((prev) => ({
        ...prev, [name]: value
      }))
      console.log(name+" "+value);
    }
    let validateForm = () => {
      if (product.mainImage == null) {
        document.getElementById('mainimageerror').innerHTML = "* upload the image"
      }
      else {
        document.getElementById('mainimageerror').innerHTML = ""

      }
      if (product.pictures == null) {
        document.getElementById('suberror').innerHTML = "* upload the image"
      }
      else {
        document.getElementById('suberror').innerHTML = ""

      }
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
      if (product.productName != "" && product.price != 0 && product.quantity != 0 && product.mainImage != null && product.pictures != null) {
        const formData = new FormData()
        formData.append('adminId', admin._id)
        //append mainimage
        for (let i = 0; i < product.mainImage.length; i++) {
          formData.append('mainImage', product.mainImage[i]);
        }
        // Append pictures files
        for (let i = 0; i < product.pictures.length; i++) {
          formData.append('pictures', product.pictures[i]);
        }
        for (const key in product) {
          if (key != 'mainImage' && key != 'pictures')
            formData.append(key, product[key])
        }
        console.log(product.mainImage);
        document.getElementById('producterror').innerHTML = ""
        document.getElementById('priceerror').innerHTML = ""
        document.getElementById('quantityerror').innerHTML = ""
        document.getElementById('mainimageerror').innerHTML = ""
        axios.post(`${hostName}/api/product`, formData).then((response) => {
          console.log(response.data);
          alert("Product has been added")
          window.location.reload()
        }).catch((error) => {
          console.log(error);
        })
      }
      else
        validateForm()
    }
    return (
      <div className='poppins min-h-[90vh] bg-slate-50'>
        <NavbarCom/>
        <div className='container bg-white mx-auto p-3 rounded '>
          <div className='flex justify-between items-center'>
            <p className='fw-medium text-lg'>Create Product</p>
            <button onClick={postvalue} className='rounded bg-violet-600 text-white p-3'>Save</button>
          </div>
          <article className='flex my-4 flex-wrap gap-3 justify-between'>

            <div className=' w-[400px]'>
              Product Name <span id='producterror' className='text-red-600'>*</span>
              <input name='productName'  onChange={handleChanges} type="text" placeholder='Enter the Product name' style={{ backgroundColor: "#f6f6f6" }} className='p-3 w-full  block my-2 px-3 border-0  rounded outline-none' />
            </div>
            <div className='w-[400px]'>
              Price <span id='priceerror' className='text-red-600'>*</span>
              <input type="number" onChange={handleChanges} name='price' placeholder='Enter the price ' style={{ backgroundColor: "#f6f6f6" }} className='p-3 w-full block my-2 px-3 border-0  rounded outline-none' />
            </div>
            <div className='w-[400px] '>
              Quantity <span id='quantityerror' className='text-red-600'>*</span>
              <input type="number" onChange={handleChanges} name='quantity' placeholder='Enter the Product name ' style={{ backgroundColor: "#f6f6f6" }} className='p-3 block w-full my-2 px-3 border-0  rounded outline-none' />
            </div>
            <div className=' w-[400px]'>
              Model Name
              <input name='modelName' onChange={handleChanges} type="text" placeholder='Enter the Model name' style={{ backgroundColor: "#f6f6f6" }} className='p-3 w-full  block my-2 px-3 border-0  rounded outline-none' />
            </div>
            <div className='w-[400px] '>
              Variety
              <input type="text" onChange={handleChanges} name='vatriety' placeholder='Enter the Product name ' style={{ backgroundColor: "#f6f6f6" }} className='p-3 block w-full my-2 px-3 border-0  rounded outline-none' />
            </div>
            <div className='w-[400px]'>
              Category
              <select onChange={handleChanges} name='category' type="text" placeholder='Enter the Product name' style={{ backgroundColor: "#f6f6f6" }} className='p-3 w-full  block my-2 px-3 border-0  rounded outline-none' >
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
              <select name='brand' onChange={handleChanges} placeholder='Enter the Product name ' style={{ backgroundColor: "#f6f6f6" }} className='p-3 w-full block my-2 px-3 border-0  rounded outline-none' >
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
              <input name='mainImage' onChange={handleChanges} type="file" placeholder='Enter the Product name ' style={{ backgroundColor: "#f6f6f6" }} className='p-3 block w-full my-2 px-3 border-0  rounded outline-none' />
            </div>
            <div className='w-[400px] '>
              Sub Images <span id='suberror' className='text-red-600' >*</span>
              <input name='pictures' onChange={handleChanges} type="file" multiple placeholder='Enter the Product name ' style={{ backgroundColor: "#f6f6f6" }} className='p-3 block w-full my-2 px-3 border-0  rounded outline-none' />
            </div>
          </article>
          <div className=''>
            <p>Description</p>
            <textarea style={{ backgroundColor: "#f6f6f6" }} name="description" onChange={handleChanges} placeholder='Enter the Description for the Product'
              className='border-slate-100 outline-none w-full border-1 p-3' id="" cols="30" rows="10"></textarea>

          </div>
        </div>

      </div>
    )
  }


export default AddProduct