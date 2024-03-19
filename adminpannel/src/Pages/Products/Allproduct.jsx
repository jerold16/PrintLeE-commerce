import React, { useContext, useEffect } from "react";
import NavbarCom from "../../Components/Navbar";
import { useNavigate } from "react-router";
import axios from "axios";
import { hostName } from "../../App";
import { StateStore } from "../../Context/StateProvider";
import Loading from "../../Components/Loading";

const Allproduct = () => {
  const { allProductDb, setAllProduct, apiCalling, setApi } =
    useContext(StateStore);
  const navigate = useNavigate();
  console.log(allProductDb);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  let deleteProduct=(id)=>{
    axios.delete(`${hostName}/api/product/${id}`).then((response)=>{
      console.log(response.data);
      alert('deleted successfull')
      window.location.reload();
    }).catch((error)=>{
      console.log(error);
    })
  }
  return (
    <div>
      {allProductDb !== undefined && apiCalling ? (
        <>
          <NavbarCom />
          <button
            onClick={() => navigate("/product/addproduct")}
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
            Add Product
          </button>
          {/* Product details */}
          <div className="table-responsive w-full mx-auto border-1 container my-4 py-2 ">
            <table className=" w-full table-striped">
              <tr>
                <th className="text-center py-2">Product Name </th>
                <th className="text-center">Product Id</th>
                <th className="text-center">Price</th>
                <th className="text-center">Quantity</th>
                <th className="text-center">Category</th>
                <th className="text-center min-w-[200px] ">Action</th>
              </tr>

              {allProductDb.map((x,index) => {
                return (
                  <tr className={`items-center w-full justify-between m-0  ${index % 2 == 0 ? "bg-slate-50" : "bg-slate-100"}`}>
                    <td className="text-center"><input value={x.productName} className="outline-none bg-transparent"/></td>
                    <td  className="text-center"> {x._id} </td>
                    <td className="text-center"><input type="number" className="outline-none w-20 removearrow text-center bg-transparent" value= {x.price} /></td>
                    <td className="text-center"><input type="number" className="outline-none w-20 removearrow text-center bg-transparent" value= {x.quantity} /></td>
                    <td className="text-center"> {x.category} </td>
                    <td className="text-center"><button className="p-2 px-3 bg-slate-400 rounded">Edit</button>
                    <button onClick={()=>deleteProduct(x._id)} className="p-2 px-3 bg-red-400 rounded mx-2">Delete</button> </td>
                  </tr>
                );
              })}
            </table>
          </div>
          {/* <div className="my-4 container border p-0">
            {allProductDb.map((x, index) => {
              return (
                <div
                  className={`items-center justify-between p-2 flex ${
                    index % 2 == 0 ? "bg-slate-50" : "bg-slate-100"
                  } `}
                >
                  <p className="m-0">{x.productName}</p>
                </div>
              );
            })}
          </div> */}
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Allproduct;
