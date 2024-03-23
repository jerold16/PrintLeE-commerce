import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { hostName } from '../App'

const MainImageModal = (props) => {

  let { show, type, setshow, pid, url, fn } = props
  let [image, setimage] = useState()
  let [bool, setbool] = useState(true)
  let clean = () => {
    setbool(true)
    setimage(null)
    fn(); //function to call the product with id so that it will reload and send the current data
    setshow(false);
  }
  let changeSubImage = () => {
    const formData = new FormData()
    formData.append('mainImage', image)
    formData.append('url', url)
    axios.put(`${hostName}/api/productImage/${pid}`, formData).then((response) => {
      console.log(response.data);
      clean()
    }).catch((error) => {
      console.log(error);
    })
  }
  let addSubImage = () => {
    const formData = new FormData()
    formData.append('mainImage', image)
    axios.put(`${hostName}/api/addSubImage/${pid}`, formData).then((response) => {
      console.log(response.data);
      clean()
    }).catch((error) => {
      console.log(error);
    })
  }
  let ChangeMainImage = () => {
    const formData = new FormData()
    formData.append('mainImage', image)
    formData.append('url', url)
    axios.put(`${hostName}/api/mainImage/${pid}`, formData).then((response) => {
      console.log(response.data);
      clean()
    }).catch((error) => console.log(error))
  }
  let deleteSubImage = () => {
    const formData = new FormData()
    formData.append('mainImage', image)
    formData.append('url', url)
    console.log({ url: url });
    axios.delete(`${hostName}/api/DeleteSub/${pid}?url=${url}`).then((response) => {
      clean()
      console.log("okok")
    }).catch((error) => {
      console.log(error);
    })
  }
  return (
    <div>

      <Modal show={show}>
        <Modal.Header>
          <p> Upload new Image </p>
        </Modal.Header>
        <input onChange={(e) => {
          let { value, files } = e.target
          if (e.target.files[0].size > 500 * 1024) {
            e.preventDefault();
            document.getElementById('mainimageerror1').innerHTML = "*selected photo Exceededs 500kb "
            e.target.value = ''
            setimage(false)
            value = null
          }
          else {
            document.getElementById('mainimageerror1').innerHTML = ""
            setimage(e.target.files[0]);
          }
          setbool(false)
        }} type="file" className='w-fit mx-auto my-5 cursor-pointer ' />
        <p className='h-[30px] text-red-500 text-center' id='mainimageerror1'></p>
        <Modal.Footer>
          <button onClick={() => { setbool(true); setimage(null); setshow(false) }} className='p-2 px-3 bg-red-500 text-white rounded'>Close</button>
          <button disabled={bool && image} onClick={() => {
            if (type == "MI")
              ChangeMainImage()
            else if (type == 'SI')
              changeSubImage()
            else
              addSubImage()
          }} className='p-2 px-3 bg-slate-500 text-white rounded'>Upload</button>
          <button onClick={deleteSubImage} className={`p-2 px-3 bg-red-500 text-white rounded ${type == 'SI' && bool ? ' ' : 'd-none'}`}>Delete</button>
        </Modal.Footer>

      </Modal>

    </div>
  )
}

export default MainImageModal
