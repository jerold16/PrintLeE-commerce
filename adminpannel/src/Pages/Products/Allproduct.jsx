import React, { useContext, useEffect, useState } from "react";
import NavbarCom from "../../Components/Navbar";
import { useNavigate } from "react-router";
import axios from "axios";
import { hostName } from "../../App";
import { StateStore } from "../../Context/StateProvider";
import Loading from "../../Components/Loading";
import { Modal } from "react-bootstrap";

const Allproduct = () => {
  const { allProductDb, setAllProduct, apiCalling, setApi } = useContext(StateStore);
  const navigate = useNavigate();
  console.log(allProductDb);
  let [confirmationshow, setconfirmationshow] = useState(false)
  let [product, setProduct] = useState()
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  let deleteProduct = (id) => {
    axios.delete(`${hostName}/api/product/${id}`).then((response) => {
      console.log(response.data);
      alert('deleted successfull')
      window.location.reload();
    }).catch((error) => {
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
                <th className="text-center py-2 ">Product Name </th>
                <th className="text-center">Product Id</th>
                <th className="text-center">Price</th>
                <th className="text-center">Quantity</th>
                <th className="text-center">Category</th>
                <th className="text-center w-fit ">Action</th>
              </tr>

              {allProductDb.map((x, index) => {
                return (
                  <tr className={`items-center w-full justify-between m-0  ${index % 2 == 0 ? "bg-slate-50" : "bg-slate-100"}`}>
                    <td className="text-center"><input value={x.productName} className="outline-none bg-transparent" /></td>
                    <td className="text-center"> {x._id} </td>
                    <td className="text-center"><input type="number" className="outline-none w-20 removearrow text-center bg-transparent" value={x.price} /></td>
                    <td className="text-center"><input type="number" className="outline-none w-20 removearrow text-center bg-transparent" value={x.quantity} /></td>
                    <td className="text-center"> {x.category} </td>
                    <td className="text-center w-fit">
                      <button onClick={() => navigate(`/product/${x._id}`)} className="p-2 px-3 bg-slate-600 text-white  rounded">Edit</button>
                      <button onClick={()=>setconfirmationshow(true)} className="p-2 px-3 text-white bg-red-600 rounded mx-2">Delete</button> </td>
                    <Modal className="p-3 " centered onHide={() => setconfirmationshow(false)} show={confirmationshow}>
                           <Modal.Title className="p-5">

                           Do you want to delete the Product ?
                           </Modal.Title>
                           <Modal.Body>
                           <div className="flex justify-around">
                        <button onClick={()=>setconfirmationshow(false)} className="p-2 px-3 rounded bg-slate-600 text-white">Cancel</button>
                        <button onClick={() => deleteProduct(x._id)} className="p-2 px-3 bg-red-600 text-white rounded">Delete</button>
                      </div>
                           </Modal.Body>
                     
                    </Modal>
                  </tr>
                );
              })}
            </table>
          </div>
        </>
      ) : (
        <Loading />
      )}

    </div>
  );
};

export default Allproduct;
