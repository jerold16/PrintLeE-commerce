import axios from 'axios'
import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import { hostName } from '../App'

const VerificationEmailModel = (props) => {
  let navigate=useNavigate()
    let {show,who}=props;
    let [otp,setotp]=useState() 
    let [enteredOTP,setEnterOTP]=useState()
    let [otpshow,setotpshow]=useState(false)  
    let [email,setemail]=useState("")
    let getOtp=(e)=>{
        e.preventDefault()
        
        axios.post(`${hostName}/api/emailverify?email=${email}`)
        .then((response)=>{
            console.log(response.data);
            setotp(response.data)
            alert("Otp has been sended successfully")
            setotpshow(true)
            {props.onHide()}
        })
        .catch((error)=>{
            console.log(error);
            let errormessage=document.getElementById('errorEmail')
            errormessage.innerHTML=error.response.data.message
        })     
    }
    let Login=()=>{
      if(otp==enteredOTP){
        axios.get(`${hostName}/api/userEmail?email=${email}&type=${who}`)
        .then((response)=>{
          
          sessionStorage.setItem('admin',JSON.stringify(response.data))
          navigate('/')
          window.location.reload()
         
        })
        .catch((err)=>{
          console.log(err);
        })
      }   
      else
      document.getElementById('errorOTP').innerHTML="Wrong OTP"    
    }
  return (
    <div>
         <Modal
         {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className=''
    >
      <Modal.Header closeButton>
        Email verification
      </Modal.Header>
      <Modal.Body className=''>
        <h4>Enter the Email</h4>
        <input onChange={(e)=>setemail(e.target.value)} placeholder='Enter the registered Email' type="email" className='rouned-full mt-2 bg-slate-100 w-full rounded-full p-3 outline-violet-600 border-0 ' />
        <p  className='h-[30px] mt-3 text-red-500' id="errorEmail" ></p>
      </Modal.Body>
      <Modal.Footer>
        <button onClick={getOtp} className='px-3 bg-green-500 text-white p-2 rounded'>Get OTP</button>
        <button className='px-3 p-2 bg-red-500 text-white rounded ' onClick={props.onHide}>Close</button>
      </Modal.Footer>
    </Modal>

    {/* Otp entering */}
    <Modal
        show={otpshow}
        onHide={()=>setotpshow(false)}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className=''
    >
      <Modal.Header closeButton>
        Log in with your otp
      </Modal.Header>
      <Modal.Body className=''>
      
        <h4 className='text-center'>Enter the OTP</h4>
        <input onChange={(e)=>setEnterOTP(e.target.value)} placeholder='Enter the OTP' type="email"
         className='rouned-full mt-4 bg-slate-100 w-fit text-center mx-auto flex rounded-full p-3 outline-violet-600 border-0 ' />
        <p  className='h-[30px] text-center mt-3 text-red-500' id="errorOTP" ></p>
      </Modal.Body>
      <Modal.Footer className='d-flex justify-content-around'>
      <button onClick={getOtp} className='px-3 bg-blue-500 text-white p-2 rounded'>Regenerate</button>
        <button onClick={Login} className='px-3 bg-green-500 text-white p-2 rounded'>Log in</button>
      </Modal.Footer>
    </Modal>
    
    </div>
  )
}

export default VerificationEmailModel