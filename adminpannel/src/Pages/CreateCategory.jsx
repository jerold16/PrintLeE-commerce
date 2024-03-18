import React, { useContext, useState } from "react";
import NavbarCom from "../Components/Navbar";
import { useNavigate } from "react-router";
import axios from "axios";
import { hostName } from "../App";
import { StateStore } from "../Context/StateProvider";
import Loading from "../Components/Loading";

const CreateCategory = () => {
  let navigate = useNavigate();
  let {categoryDB,setApi,apiCalling}=useContext(StateStore)
  let [categoryObj,setObj]=useState({
    category:null,
    image:null
  })
  let handlechange=(e)=>{
    let {name,value}=e.target 
    setObj((prev)=>{
      if(name=='image')
        return {...prev,[name]:e.target.files[0]}
      return {...prev,[name]:value}
      })
  }
  let addCategory=()=>{
    let formdata=new FormData()
    formdata.append("category",categoryObj.category)
    formdata.append("image",categoryObj.image)
    if(categoryObj.category!=null&&categoryObj.image!=null){
    setApi(false)
    document.getElementById('errormessage').innerHTML=""
    axios.post(`${hostName}/api/category`,formdata).then((response)=>{
      console.log(response.data);
      window.location.reload()
      setApi(true)
      return
    }).catch((error)=>{
      console.log(error);
      return
    })}
    document.getElementById('errormessage').innerHTML="Enter the Fields"
  }
  return (
    <div className="poppins min-h-[100vh] bg-slate-100">
      {
        apiCalling ?<>
      <NavbarCom />
      <button
        onClick={() => navigate("/createBrand")}
        className="p-2 px-3 rounded bg-violet-600 text-white mx-4 flex items-center gap-3"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          class="bi bi-plus-lg"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"
          />
        </svg>{" "}
        Create Brand
      </button>

      {/* Adding the Category */}
      <div className="container my-4 p-4 bg-white rounded-xl">
        <h4 className="fw-light p-3">Create Category</h4>

        <div className="flex flex-wrap my-3 justify-around">
          <div>
            Category Name :
            <input
              name="category"
              onChange={handlechange}
              required
              type="text"
              placeholder="Enter the Category name"
              className="rounded text-sm bg-slate-50 outline-none px-3 block my-2 p-3 "
            />
          </div>
          <div>
            Category logo :
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
        <h4 className="fw-light p-3">List of Categories</h4>
        <div className="flex mx-auto flex-wrap gap-3 ">
          {/* Card */}
          { categoryDB!=undefined ?
            categoryDB.map((x)=>{
              return(
                <div className="w-[8rem] mx-3 border-slate-700 rounded  border-1  ">
                <img
                  className="object-cover rounded-t w-[8rem] h-[8rem] "
                  src={x.image}
                  alt="Logo"
                />
                <p className="text-center my-2">{x.category}</p>
              </div>
              )
            }) :""
          }
         
        </div>
      </div>
      </> : <Loading/>
      }
    </div>
  );
};

export default CreateCategory;
