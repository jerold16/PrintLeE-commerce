import React, { useState } from 'react'
import { Col, Row, Toast } from 'react-bootstrap'
import NavBar from './NavBar'
import TitleBanner from './TitleBanner'
import { Link, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import Subcripstion from './Subcripstion'
import axios from 'axios'
import VerificationEmailModel from './VerificationEmailModel'

const Myaccount = () => {
    let [show,setshow]=useState(false)
    const navigate=useNavigate();
    const [login,setlogin]=useState({
        emailNum:"",
        password:""
    })
    const handleLoginForm=(e)=>{
        setlogin((prev)=>({
            ...prev,
            [e.target.name]:e.target.value
        }))

    }
    const [registeration,setregisteration]=useState({
        username:"",
        phone:Number,
        email:"",
        password:""
    })
    const handleRegiterformChanges=(e)=>{
        const value=e.target.value;
        const name=e.target.name;
        if(name=='phone' ){
            if(value.length<=10){
                 setregisteration((prev)=>({
               ...prev,
               [name]:value 
            }))}
        }
        else{
        setregisteration((prev)=>({
            ...prev,
            [name]:value
        }))}

    }
    let registerationValidation=()=>{
      let nameregrex=/^[a-zA-Z]{3,}$/
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      let num=/^[0-9]{10}$/
      let error=document.getElementById('registerationError')
      if(!nameregrex.test(registeration.username))
        return error.innerHTML="Enter the name properly"
    if(!emailRegex.test(registeration.email))
       return error.innerHTML="Enter the Mail properly"
      if(!num.test(registeration.phone))
        return error.innerHTML="Mobile number should to 10 digit"        

    }
    let handleregisteration=(e)=>{
        e.preventDefault()
        if(registeration.username&&registeration.email&&registeration.phone&&registeration.password){
        document.getElementById('registerationError').innerHTML=""
        registerationValidation()
        axios.post(`http://localhost:3020/api/user`,registeration).then((response)=>{
            console.log("Stored");
            
            sessionStorage.setItem('user',response.data)
            setregisteration({
                username:"",
                phone:"",
                email:"",
                password:""
            })           
            console.log(response.data);
            navigate('/')
        }).catch((error)=>{
            console.log(error);
            document.getElementById('registerationError').innerHTML=error.response.data.message
        })}
        else
         document.getElementById('registerationError').innerHTML="Enter all the input field"
    }
    let handleLogin=(e)=>{
        e.preventDefault()
        if(login.emailNum&&login.password){
        axios.get(`http://localhost:3020/api/user?emailNum=${login.emailNum}&password=${login.password}`)
        .then((response)=>{
            console.log(response);
            document.getElementById('loginerror').innerHTML=""
            setlogin({
                emailNum:"",
                password:""
            })
            navigate('/')
        })
        .catch((error)=>{
            console.log(error.response.data.message);
            document.getElementById('loginerror').innerHTML=error.response.data.message
        })}
        else
        document.getElementById('loginerror').innerHTML="Enter the Input"           
    }
  return (
    <div className='bg-slate-100'>
        <NavBar/>
        <TitleBanner page='My Account' />
        <Row className='container my-3 justify-around min-h-[90vh]  mx-auto'>
            <Col lg={5} className='flex'>
               <div className='my-auto p-3 mx-auto w-full '>
               <h4 className='poppins'>Login </h4>
                <p>Phone or email address <sup className='text-red-500 text-lg mb-0'>*</sup> </p>
                <input name='emailNum' value={login.emailNum} onChange={(e)=>handleLoginForm(e)}
                type="text" placeholder='Enter the phone number or email address'
                 className='outline-violet-500 border-0 rounded-full bg-white p-3 px-3 w-full ' />
                <p className='mt-3'>Password <sup className='text-red-500 text-lg mb-0'>*</sup> </p>
                <input name='password' value={login.password} onChange={(e)=>handleLoginForm(e)}
                type="password" placeholder='Enter your password'
                 className='outline-violet-500 border-0 rounded-full bg-white p-3 px-3 w-full ' />
{/* Error message */}
                 <p id='loginerror' className='h-[30px] my-2 text-red-500 poppins'></p>
                <div className='mt-3 justify-between flex'>
                    <article className='flex w-fit items-center gap-2 '>
                        <input type="checkbox" id='rememberme' />
                        <label className='' htmlFor="rememberme">Remember me</label>
                    </article>
                    <Link onClick={()=>setshow(true)} className=' decoration-dotted '>Lost your password ?</Link>
                </div>
                <button onClick={handleLogin} className='bg-violet-600 hover:bg-slate-950 text-slate-50 rounded-full w-full p-3 my-3'>Log in</button>
               </div>

            </Col>
            <Col lg={5} className='flex  '>
                <div className='my-auto p-3 w-full mx-auto'>
                    <h4 className='popins text-2xl fw-semibold'>Register</h4>
                    <div  className='my-2'>
                    <p>Username <sup className='text-red-500 text-lg mb-0'>*</sup> </p>
                <input value={registeration.username} name='username' 
                onChange={(e)=>handleRegiterformChanges(e)} 
                type="text" placeholder='Enter your Name'
                 className='outline-violet-500 border-0 rounded-full bg-white p-3 px-3 w-full ' />
                    </div>
                    <div  className='my-2'>
                    <p>Email <sup className='text-red-500 text-lg mb-0'>*</sup> </p>
                <input value={registeration.email} name='email' onChange={(e)=>handleRegiterformChanges(e)}
                 type="text" placeholder='Enter your email'
                 className='outline-violet-500 border-0 rounded-full bg-white p-3 px-3 w-full ' />
                    </div>
                    <div  className='my-2'>
                    <p>Password <sup className='text-red-500 text-lg mb-0'>*</sup> </p>
                <input value={registeration.password} name='password' onChange={(e)=>handleRegiterformChanges(e)}
                type="text" placeholder='Enter your password'
                 className='outline-violet-500 border-0 rounded-full bg-white p-3 px-3 w-full ' />
                    </div>
                    <div  className='my-2'>
                    <p>Phone <sup className='text-red-500 text-lg mb-0'>*</sup> </p>
                <input value={registeration.phone} name='phone' onChange={(e)=>handleRegiterformChanges(e)}
                type="number" placeholder='Enter your Phone number'
                 className='outline-violet-500 numberwithoutarrow border-0 rounded-full bg-white p-3 px-3 w-full ' />
                    </div>
                    <p id='registerationError' className='h-[30px] text-red-500 poppins '></p>
                    <p className='poppins my-2 fw-light text-sm '>
                    Your personal data will be used to support your experience throughout this website, to manage access to your account, 
                    and for other purposes described in our privacy policy.
                    </p>
                    <button onClick={handleregisteration}
                    className='bg-violet-600 hover:bg-slate-950 text-slate-50 rounded-full w-full p-3 my-3'>Register</button>
              
                </div>
            </Col>

        </Row>
        <VerificationEmailModel who="user" show={show} onHide={() => setshow(false)} />
      <Subcripstion/>
      <Footer/>
    </div>
  )
}

export default Myaccount