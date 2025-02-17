import React, { useState } from 'react';
import Signup from '../assets/Images/signup.webp';
import { LuEye, LuEyeOff } from "react-icons/lu";
import { sendOtp } from '../services/operations/authOperation';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSignupData } from '../features/auth/authSlice';
import Loader from './Loader';

function Login() {
  
  const {loader}=useSelector((state)=>state.auth);

  const [eyeStatusOfPass, setEyeStatusOfPass] = useState(false);
  const [eyeStatusOfConfPass, setEyeStatusConfOfPass] = useState(false);
  const [role, setRole] = useState('Student');

  const navigate=useNavigate()
  const dispatch=useDispatch();

  const [formData,setFormData]=useState({
    firstName:'',
    lastName:'',
    email:'',
    password:'',
    confirmPassword:'',
    accountType:role,
  })

  function changeHandler(name,value){
    setFormData((prev)=>({
      ...prev,
      [name]:value
    }))
  }

  function sendToChangeHandler(event){
    const {name,value}=event.target;
    changeHandler(name,value);
  }

  function submitHandler(event){
    event.preventDefault();
    dispatch(sendOtp(formData.email))
    dispatch(setSignupData(formData))
    navigate('/Verifyotp')
  }

  function selectRoleHandler(event) {
    const selectedRole = event.target.id;
    setRole(selectedRole);
    changeHandler('accountType', selectedRole);
  }

  function clickHandlerOfPass() {
    setEyeStatusOfPass(!eyeStatusOfPass);
  }

  function clickHandlerOfConfPass() {
    setEyeStatusConfOfPass(!eyeStatusOfConfPass);
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
            <div className='flex justify-between mt-20 mb-20'>
              <div className='w-[40%]'>
                <div>
                  <h1 className='text-3xl font-semibold'>
                    Join the millions learning to code with StudyNotion for free
                  </h1>
                  <p className='mt-5 text-lg font-light text-richblack-300'>
                    Build skills for today, tomorrow, and beyond.
                  </p>
                  <p className='mt-1 text-blue-100'>
                    Education to future-proof your career.
                  </p>
                </div>

                <button  onClick={selectRoleHandler}>
                    <div name='accountType' value={role} className='flex bg-richblack-700 w-fit py-2 mt-5 rounded-full gap-5 px-5'>
                      <div 
                        id={'Student'}
                        className={`hover:bg-richblack-900 px-4 py-2 rounded-full font-semibold text-richblack-200 ${role==="Student"?("bg-richblack-900"):("")} `}>
                          Student
                      </div>

                      <div 
                        id={'Instructor'} 
                        className={`hover:bg-richblack-900 px-4 py-2 rounded-full font-semibold text-richblack-200 ${role==="Instructor"?("bg-richblack-900"):("")}`}>
                          Instructor
                      </div>
                    </div>
                  </button>

                <form onSubmit={submitHandler}>

                  <div className='flex justify-between mt-9 space-x-9'>
                    <div className='flex flex-col w-full '>
                      <label name='firstName' className='text-sm text-richblack-100  focus:bg-richblack-700 ' htmlFor="email">Frist Name</label>
                      <input
                        required 
                        name='firstName' 
                        className='rounded-lg py-3 px-5 bg-richblack-700 mt-1 focus:bg-richblack-700 active:bg-richblack-700' 
                        type="text" 
                        value={formData.firstName}
                        placeholder='Enter Frist Name'
                        // autoComplete='off'
                        onChange={sendToChangeHandler}
                        />
                    </div>

                    <div className='flex flex-col w-full'>
                      <label className='text-sm text-richblack-100' htmlFor="email">Last Name</label>
                      <input
                        required 
                        name='lastName' 
                        className='rounded-lg py-3 px-5 bg-richblack-700 mt-1' 
                        type="text"
                        value={formData.lastName} 
                        placeholder='Enter Last Name'
                        // autoComplete='off'
                        onChange={sendToChangeHandler}
                        />
                    </div>
                  </div>

                  <div className='flex flex-col mt-4 w-[55%]'>
                    <label className='text-sm text-richblack-100' htmlFor="email">Email Address</label>
                    <input
                      required 
                    name='email' 
                    className='rounded-lg py-3 px-5 bg-richblack-700 mt-1 focus:bg-richblack-700' 
                    type="email" 
                    value={formData.email}
                    placeholder='Enter email address'
                    //  autoComplete='off' 
                    onChange={sendToChangeHandler}
                    />
                  </div>
                  <div className='flex justify-between mt-4 space-x-9'>
                    <div className='flex flex-col relative w-full'>
                        <label className='text-sm text-richblack-100' htmlFor="password">Password</label>
                        <input
                          required 
                        name='password' 
                        className='rounded-lg py-3 px-5 bg-richblack-700 mt-1' 
                        type={eyeStatusOfPass ? "text" : "password"} 
                        value={formData.password}
                        placeholder='Enter Password'
                        onChange={sendToChangeHandler}
                        />
                        <span onClick={clickHandlerOfPass} className='absolute right-3 top-10 cursor-pointer'>
                          {eyeStatusOfPass ? <LuEye /> : <LuEyeOff />}
                        </span>
                      </div>

                      <div className='flex flex-col relative w-full'>
                        <label className='text-sm text-richblack-100' htmlFor="password">Confirm Password</label>
                        <input
                          required 
                        name='confirmPassword' 
                        className='rounded-lg py-3 px-5 bg-richblack-700 mt-1' 
                        type={eyeStatusOfConfPass ? "text" : "password"} 
                        value={formData.confirmPassword}
                        placeholder='Enter Confirm Password'
                        onChange={sendToChangeHandler}
                        />
                        <span onClick={clickHandlerOfConfPass} className='absolute right-3 top-10 cursor-pointer'>
                          { eyeStatusOfConfPass? <LuEye /> : <LuEyeOff />}
                        </span>
                      </div>
                  </div>

                  <div className='flex justify-center'>
                    <button className='mt-9 w-96 mx-auto text-black text-lg text-center bg-yellow-50 p-2 rounded-lg'>
                      Sign In
                    </button>
                  </div>
                </form>
              </div>

              <div>
                <img src={Signup} alt="" />
              </div>
            </div>
          </div>
        )
      }
    </div>
  );
}

export default Login;
