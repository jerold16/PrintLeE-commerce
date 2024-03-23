import React, { useContext, useState } from 'react'
import NavbarCom from '../Components/Navbar'
import { useNavigate } from 'react-router'
import axios from 'axios'
import { hostName } from '../App'
import { StateStore } from '../Context/StateProvider'
import Loading from '../Components/Loading'
import EditCBModal from '../Components/EditCBModal'

const CreateBrand = () => {
  let navigate = useNavigate()
  let [editmodel,setEditmodal]=useState(false)
  let [pid,setpid]=useState()
  let { setApi,fetchdata, categoryDB, apiCalling, brandDB } = useContext(StateStore)
  let [brandobj, setBrand] = useState({
    brand: null,
    image: null,
    category:null
  })
  let handlechange = (e) => {
    let { value, name } = e.target
    setBrand((prev) => {
      if (name == 'image')
        return { ...prev, [name]: e.target.files[0] }
      return { ...prev, [name]: value }
    })
  }
  let addCategory = () => {
    let formdata = new FormData()
    formdata.append("brand", brandobj.brand)
    formdata.append("image", brandobj.image)
    formdata.append('category',brandobj.category)
    if (brandobj.brand != null && brandobj.image != null) {
      document.getElementById('errormessage').innerHTML = ""
      axios.post(`${hostName}/api/brand`, formdata).then((response) => {
        console.log(response.data);
        setBrand({
          brand: null,
          image: null,
          category:null
        })
        
      fetchdata()
      }).catch((error) => {
        console.log(error);
      })
    }
    else
      document.getElementById('errormessage').innerHTML = "Enter the Fields"
  }
  return (
    <>
      {
        brandDB != undefined ? <>

          <div className='bg-slate-50 min-h-[100vh]'>
            <NavbarCom />
            <button onClick={() => navigate('/createCategory')} className='p-2 px-3 rounded bg-violet-600 text-white mx-4 flex items-center gap-3'>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2" />
              </svg>  Create Category
            </button>

            <div className="container my-4 p-4 bg-white rounded-xl">
              <h4 className="fw-light p-3">Create Brand</h4>

              <div className="flex flex-wrap my-3 justify-around">
                <div>
                  Brand Name :
                  <input
                    name="brand"
                    onChange={handlechange}
                    required
                    type="text"
                    placeholder="Enter the Category name"
                    className="rounded text-sm bg-slate-50 outline-none px-3 block my-2 p-3 "
                  />
                </div>
                <div>
                  Category :
                  <select name="category" onChange={handlechange}  className='p-3 w-full bg-slate-50 block my-2 px-3 border-0  rounded outline-none'  id="">
                    <option value="">select</option>
                    {
                      categoryDB != undefined ? categoryDB.map((x) => {
                        return (
                          <option value={x.category}>{x.category}</option>
                        )
                      }) :"" 
                    }

                  </select>
                </div>
                <div>
                  Brand logo :
                  <input
                    type="file"
                    name="image"
                    required
                    onChange={handlechange}
                    placeholder="Enter the Category name"
                    className="rounded text-sm bg-slate-50 outline-none px-3 block my-2 p-3 "
                  />
                </div>
              </div>
              <p className="h-[30px] text-red-500 text-center" id="errormessage"></p>
              <button onClick={addCategory} className="ms-auto flex p-2 px-3 bg-green-500 text-white rounded">
                Add
              </button>
            </div>
            {/* Viewing card   */}
            {/* List of category */}
            <div className="container bg-white mx-auto rounded-xl p-3">
              <h4 className="fw-light p-3">List of Brand</h4>
              <div className="flex mx-auto flex-wrap gap-3 ">
                {/* Card */}
                {brandDB != undefined && brandDB.length > 0 ?
                  brandDB.map((x) => {
                    return (
                      <div onClick={()=>{setEditmodal(true);setpid(x)}} className="w-[8rem] hover:scale-105 transition duration-500 cursor-pointer mx-3 border-slate-700 rounded  border-1  ">
                        <img
                          className="object-contain rounded-t w-[8rem] h-[8rem] "
                          src={x.image}
                          alt="Logo" />
                        <p className="text-center h-[30px] my-2">{x.brand}</p>
                        
                      </div>
                    )
                  }) : <div className='w-full'>
                    <p className='text-center'>List is empty, add it</p>
                  </div>
                }

              </div>
            </div>
            <EditCBModal show={editmodel} setshow={setEditmodal} pid={pid} />
          </div>
        </> : <Loading />
      }</>
  )
}

export default CreateBrand