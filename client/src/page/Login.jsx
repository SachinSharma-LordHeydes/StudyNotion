import React, { useState } from 'react';
import loginImg from '../assets/Images/login.webp';
import { LuEye, LuEyeOff } from "react-icons/lu";
import { useDispatch, useSelector } from 'react-redux';
import { login, sendResetPasswordMail } from '../services/operations/authOperation';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';

function Login() {

  const {loader}=useSelector((state)=>state.auth);

  const [eyeStatus, setEyeStatus] = useState(false);

  const dispatch=useDispatch();
  const navigate=useNavigate();

  const [formData,setFormData]=useState({
    email:"",
    password:"",
  });

  function clickHandler() {
    setEyeStatus(!eyeStatus);
  }

  function changeHandler(event){
    const {name,value}=event.target
    setFormData((prev)=>({
      ...prev,
      [name]:value
    }))
  }

  function goToForgotPass(){
    console.log("Login FOrm data => ",formData.email)
    navigate('/Resetpassword')
  }

  function submitHandler(event){
    event.preventDefault();
    dispatch(login(formData,navigate))
  }

  return (
    <div>
      {
        loader?
        (
          <Loader></Loader>
        )
        :
        (
          <div className='mx-auto w-11/12 flex flex-col text-white pt-16'>
            <div className='flex justify-between mt-20'>
              <div>
                <div>
                  <h1 className='text-3xl font-semibold'>
                    Welcome Back
                  </h1>
                  <p className='mt-7 text-lg font-light text-richblack-300'>
                    Build skills for today, tomorrow, and beyond.
                  </p>
                  <p className='mt-1 text-blue-100'>
                    Education to future-proof your career.
                  </p>
                </div>
                <form onSubmit={submitHandler}>
                  <div className='flex flex-col mt-16'>
                    <label className='text-sm text-richblack-100' htmlFor="email">Email Address</label>
                    <input 
                      onChange={changeHandler} 
                      name='email' 
                      value={formData.email}
                      className='rounded-lg py-3 px-5 bg-richblack-700 mt-1' type="email" placeholder='Enter email address' />
                  </div>
                  <div className='flex flex-col mt-9 relative'>
                    <label className='text-sm text-richblack-100' htmlFor="password">Password</label>
                    <input 
                      onChange={changeHandler} 
                      name='password' 
                      value={formData.password}
                      className='rounded-lg py-3 px-5 bg-richblack-700 mt-1' type={eyeStatus ? "text" : "password"} placeholder='Enter Password' />
                    <span onClick={clickHandler} className='absolute right-3 top-10 cursor-pointer'>
                      {eyeStatus ? <LuEye /> : <LuEyeOff />}
                    </span>
                    <div 
                      onClick={goToForgotPass} 
                      className='flex justify-end text-sm text-blue-100 mt-1 hover:cursor-pointer' >Forget password</div>
                    <button
                      
                      className='mt-9 w-96 mx-auto text-black text-lg text-center bg-yellow-50 p-2 rounded-lg'>
                      Log In
                    </button>
                  </div>
                </form>
              </div>

              <div>
                <img src={loginImg} alt="" />
              </div>
            </div>
          </div>
        )
      }
    </div>
  );
}

export default Login;
