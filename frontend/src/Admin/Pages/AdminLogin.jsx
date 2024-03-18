import axios from 'axios'
import React, { useState } from 'react'
import { hostname } from '../../App'
import { Modal } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import VerificationEmailModel from '../../Component/VerificationEmailModel'

const AdminLogin = () => {
    let navigate=useNavigate()
    let [email,setemail]=useState("")
    let [show,setshow]=useState(false)
    let [forgotModal,setForgotmodal]=useState(false)
    let [password,setpassword]=useState("")
    let [otp,setotp]=useState()
    let [EnterOtp,setEnterotp]=useState()
    let [showmodal,setshowmodal]=useState(false)
    let [showadminregister,setshowadmin]=useState(false)
    let [adminSignup,setAdminSignUp]=useState({
        adminUser:"",
        email:"",
        phone:'',
        password:""
    })
    let handlechangeAdmin=(e)=>{
        setAdminSignUp((prev)=>({
            ...prev,
            [e.target.name]:e.target.value

        }))
    }
    let Login =(e)=>{
        e.preventDefault()
        axios.get(`http://localhost:3020/api/admin?emailNum=${email}&password=${password}`)
        .then((response)=>{
            alert("ookok")
            sessionStorage.setItem('admin',response.data)
            navigate('/admin/dashboard')
        })
        .catch((error)=>{
            document.getElementById('errorlogin').innerHTML=error.response.data
            console.log(error.response.data);
        })
    }
    let optcheck=(e)=>{
        e.preventDefault()
        if(adminSignup.adminUser&&adminSignup.email&&adminSignup.password&&adminSignup.phone){
            document.getElementById('errorRegister').innerHTML=""
            axios.post(`${hostname}/api/adminCheck`).then((response)=>{
            alert(response.data.message)
            setotp(response.data.otp)
            console.log(response.data.otp);
            setshowmodal(true)
        }).catch((error)=>{
            console.log(error);
        })}
        else
          document.getElementById('errorRegister').innerHTML="Enter all the inputs"

    }
    let Register=(e)=>{
        e.preventDefault()
       if(otp==EnterOtp)
         {
            axios.post(`${hostname}/api/admin`,adminSignup).then((response)=>{
                alert("Account has been registered")
                sessionStorage.setItem('admin',response.data)
                console.log(response.data);
                navigate('/admin/dashboard')
            }).catch((err)=>{
                console.log(err);
            })
         }
    }
  return (
    <div className='flex poppins h-[100vh]'>
        <div className={`col-md-8 ${showadminregister?"d-none":""} col-lg-6 col-xl-5 shadow border-1 p-3 my-auto text-center mx-auto rounded`} >
            <h3>Admin Login</h3>
            <div className='my-3'>
                <p className='text-start'>Admin mail or phone <sup className='text-red-500 text-lg'>*</sup></p>
                <input onChange={(e)=>setemail(e.target.value)} type="email" placeholder='Enter the Mail or the phone' 
                className='p-2 px-3 w-full rounded border-1  ' />
            </div>
            <div className='my-3'>
                <p className='text-start'>Password <sup className='text-red-500 text-lg'>*</sup></p>
                <input onChange={(e)=>setpassword(e.target.value)} type="password" placeholder='Enter the password' 
                className='p-2 px-3 rounded border-1 w-full ' />
            </div>
            <p id='errorlogin' className='h-[30px] text-red-700 '></p>
            <div className='flex justify-between my-3 '>
                <button onClick={()=>setshowadmin(true)} 
                className='text-blue-600 text-decoration-underline'>Sign up</button>
                <button className='text-blue-600 text-decoration-underline' onClick={()=>setshow(true)} >Forgot password? </button>
            </div>
             <button onClick={Login} className='px-3 p-2 bg-red-500 text-white rounded'>Log in</button>
        </div>
        {/* Registeration form */}

        <div className={`col-md-8 ${showadminregister?"":"d-none"} col-lg-6 col-xl-5 shadow border-1 p-3 my-auto text-center mx-auto rounded`} >
            <h3>Admin SignUp</h3>
            <div className='my-3'>
                <p className='text-start'>Admin Name  <sup className='text-red-500 text-lg'>*</sup></p>
                <input name='adminUser' onChange={(e)=>handlechangeAdmin(e)} type="text" placeholder='Enter the Mail or the phone' 
                className='p-2 px-3 w-full rounded border-1  ' />
            </div>
            <div className='my-3'>
                <p className='text-start'>Phone  <sup className='text-red-500 text-lg'>*</sup></p>
                <input name='phone' onChange={(e)=>handlechangeAdmin(e)} type="text" placeholder='Enter the Mail or the phone' 
                className='p-2 px-3 w-full rounded border-1  ' />
            </div>
            <div className='my-3'>
                <p className='text-start'>Admin mail  <sup className='text-red-500 text-lg'>*</sup></p>
                <input name='email' onChange={(e)=>handlechangeAdmin(e)} type="email" placeholder='Enter the Mail or the phone' 
                className='p-2 px-3 w-full rounded border-1  ' />
            </div>
            <div className='my-3'>
                <p className='text-start'>Password <sup className='text-red-500 text-lg'>*</sup></p>
                <input name='password' onChange={(e)=>handlechangeAdmin(e)} type="password" placeholder='Enter the password' 
                className='p-2 px-3 rounded border-1 w-full ' />
            </div>
            <p id='errorRegister' className='h-[30px] text-red-700 '></p>
            <div className='flex justify-end my-3 '>
                <button className='text-blue-700 text-decoration-underline ' onClick={()=>setshowadmin(false)} >Log in page</button>
                
            </div>
             <button onClick={optcheck} className='px-3 p-2 bg-red-500 text-white rounded'>Register</button>
        </div>
{/* OTP model */}

    <Modal
        show={showmodal}
        onHide={()=>setshowmodal(false)}
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
        <input onChange={(e)=>setEnterotp(e.target.value)} placeholder='Enter the OTP' type="email"
         className='rouned-full mt-4 bg-slate-100 w-fit text-center mx-auto flex rounded-full p-3 outline-violet-600 border-0 ' />
        <p  className='h-[30px] text-center mt-3 text-red-500' id="errorOTP" ></p>
      </Modal.Body>
      <Modal.Footer className='d-flex justify-content-around'>
      <button onClick={optcheck} className='px-3 bg-blue-500 text-white p-2 rounded'>Regenerate</button>
        <button onClick={Register} className='px-3 bg-green-500 text-white p-2 rounded'>Register</button>
      </Modal.Footer>
    </Modal>
    <VerificationEmailModel who="admin" show={show} onHide={() => setshow(false)} />
      
 </div>
  )
}

export default AdminLogin