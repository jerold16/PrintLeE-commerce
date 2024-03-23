import axios from 'axios'
import React, { useContext, useState } from 'react'
import { hostname } from '../App'
import { Modal } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import VerificationEmailModel from '../Component/VerificationEmailModel'
import { Storage } from '../Context/StateStore'

const UserLogin = () => {
    let {showmain,setshowmain,userSet,user,setuser}=useContext(Storage)
    let navigate=useNavigate()
    let [erorlogin,seterrorlogin]=useState()
    let [email,setemail]=useState("")
    let [show,setshow]=useState(false)
    let [forgotModal,setForgotmodal]=useState(false)
    let [password,setpassword]=useState("")
    let [otp,setotp]=useState()
    let [EnterOtp,setEnterotp]=useState()
    let [showmodal,setshowmodal]=useState(false)
    let [showadminregister,setshowadmin]=useState(false)
    let [adminSignup,setAdminSignUp]=useState({
        username:"",
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
        if(email&&password)
        axios.get(`http://localhost:3020/api/user?emailNum=${email}&password=${password}`)
        .then((response)=>{
            alert("Login Successfull")
            sessionStorage.setItem('user',JSON.stringify(response.data._id))
            userSet()
            setuser(response.data._id)
            setshowmain(false)
        })
        .catch((error)=>{
            document.getElementById('errorlogin').innerHTML="error"
            seterrorlogin(error.response.data.message)
            console.log(error.response.data.message);
        })
        else
          seterrorlogin("Enter All the input")
    }
    let optcheck=(e)=>{
        e.preventDefault()
        if(adminSignup.username&&adminSignup.email&&adminSignup.password&&adminSignup.phone){
            document.getElementById('errorRegister').innerHTML=""
            axios.post(`${hostname}/api/userVerify`,adminSignup).then((response)=>{
            alert(response.data.message)
            setotp(response.data.otp)
            console.log(response.data.otp);
            setshowmodal(true)
        }).catch((error)=>{
            console.log(error);
        })}
        else{
            alert('error')
          document.getElementById('errorRegister').innerHTML="Enter all the inputs"
    }
}
    let Register=(e)=>{
        e.preventDefault()
       if(otp==EnterOtp)
         {
            axios.post(`${hostname}/api/user`,adminSignup).then((response)=>{
                alert("Account has been registered")
                sessionStorage.setItem('user',JSON.stringify(response.data._id))
                setuser(response.data)
                userSet()
                console.log(response.data);
                setshowmodal(false)
                setshowmain(false)
            }).catch((err)=>{
               alert(err.response.data.message);
            })
         }
    }
  return (
    <div className='flex poppins h-[100vh]'>
        <Modal centered className='z-10' onHide={() => setshowmain(false)} placement='end' show={showmain}>
        <div className={` ${showadminregister?"d-none":""} w-full shadow border-1 p-4 my-auto text-center mx-auto rounded`} >
            <h3>User Login</h3>

            <div className='my-3'>
                <p className='text-start'>User mail or phone <sup className='text-red-500 text-lg'>*</sup></p>
                <input onChange={(e)=>setemail(e.target.value)} type="email" placeholder='Enter the Mail or the phone' 
                className='p-2 px-3 w-full outline-none rounded border-1  ' />
            </div>
            <div className='my-3'>
                <p className='text-start'>Password <sup className='text-red-500 text-lg'>*</sup></p>
                <input onChange={(e)=>setpassword(e.target.value)} type="password" placeholder='Enter the password' 
                className='p-2 px-3 rounded  outline-none border-1 w-full ' />
            </div>
            <p id='errorlogin' className='h-[30px] text-red-700 '>{erorlogin} </p>
            <div className='flex justify-between my-3 '>
                <button onClick={()=>setshowadmin(true)} 
                className='text-blue-600 text-decoration-underline'>Sign up</button>
                <button className='text-blue-600 text-decoration-underline' onClick={()=>{setshowmain(false);setshow(true)}} >Forgot password? </button>
            </div>
             <button onClick={Login} className='px-3 p-2 bg-red-500 text-white rounded'>Log in</button>
        </div>
        {/* Registeration form */}

        <div className={` ${showadminregister?"":"d-none"} w-full shadow border-1 p-3 my-auto text-center mx-auto rounded`} >
            <h3>Registeration</h3>
            <div className='my-3'>
                <p className='text-start'> Name  <sup className='text-red-500 text-lg'>*</sup></p>
                <input name='username' onChange={(e)=>handlechangeAdmin(e)} type="text" placeholder='Enter the Username' 
                className='p-2 px-3 w-full rounded border-1  ' />
            </div>
            <div className='my-3'>
                <p className='text-start'>Phone  <sup className='text-red-500 text-lg'>*</sup></p>
                <input name='phone' onChange={(e)=>handlechangeAdmin(e)} type="text" placeholder='Enter the phone' 
                className='p-2 px-3 w-full rounded border-1  ' />
            </div>
            <div className='my-3'>
                <p className='text-start'> Email  <sup className='text-red-500 text-lg'>*</sup></p>
                <input name='email' onChange={(e)=>handlechangeAdmin(e)} type="email" placeholder='Enter the Email' 
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



    </Modal>
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
    <VerificationEmailModel obj={adminSignup} who="user" show={show} onHide={() => setshow(false)} />
      
 </div>
  )
}

export default UserLogin