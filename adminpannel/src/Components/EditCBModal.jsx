import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { hostName } from '../App'
import { StateStore } from '../Context/StateProvider'
import Loading from './Loading'

const EditCBModal = (props) => {
    let {fetchdata}=useContext(StateStore)
    let [upload,setUpload]=useState(true)
    let {show,setshow ,pid}=props
    let [error,seterror]=useState()
    let [image,setimage]=useState()
    let deleteBrand=()=>{
          axios.delete(`${hostName}/api/brand/${pid._id}`).then((response)=>{
               alert(response.data.message)
               setshow(false)
               fetchdata()
          }).catch((error)=>{
            console.log(error);
          })
    }
    let uploadBrand=()=>{
        console.log(image);
        const formadata=new FormData()
        formadata.append('image',image)
        formadata.append('id',pid._id)
        axios.put(`${hostName}/api/brand`,formadata).then((response)=>{
            console.log(response);
            setshow(false);
            fetchdata()
        }).catch((error)=>console.log(error))
    }
  return (
    <div>
        {
            pid!=undefined ? <>  
        <Modal show={show} centered  className='p-4' onHide={()=>setshow(false)}>
            <Modal.Header className=''>
                Edit the Brand Image
                <img onClick={()=>setshow(false)} src={require('../Assest/plus.png')} alt="plus" className='rotate-45 ms-auto cursor-pointer' width={20} />
            </Modal.Header>
            <Modal.Body>
                
                Upload the Image :
                <input onChange={(e)=>{
                    if(e.target.files[0].size>500*1024){
                       seterror("Upload the Smaller file")
                       e.target.value=''}
                    else{
                        setUpload(false)
                        seterror('')
                        setimage(e.target.files[0])
                    }
                }} type="file" className='bg-slate-50 p-2 px-3 ' />
                <p className='h-[30px] text-center text-red-600 '>{error} </p>
            </Modal.Body>
            <Modal.Footer>
               <button disabled={upload} onClick={uploadBrand} className='bg-slate-600 p-2 px-3 rounded text-white'>Upload</button>
                <button className='bg-red-500 p-2 px-3 rounded text-white' onClick={deleteBrand}>Delete</button>
            </Modal.Footer>
        </Modal>
        </>: ""
        }
    </div>
  )
}

export default EditCBModal
