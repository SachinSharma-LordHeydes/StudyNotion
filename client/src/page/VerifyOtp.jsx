import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../services/operations/authOperation';
import Loader from './Loader';

function VerifyOtp() {

  const signUpData = useSelector((state) => state.auth.signupData); 
  const {loader}=useSelector((state)=>state.auth);

  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [error, setError] = useState(false);
  // const [loading, setLoading] = useState(false);
  // const [success, setSuccess] = useState(false);

  const dispatch=useDispatch()
  const navigate=useNavigate()

  const loading=useSelector((state)=>state.auth.loading)
  const otpSent=useSelector((state)=>state.auth.otpSent)
  

  const handleChange = (event, index) => {
    const value = event.value.replace(/[^0-9]/g, '');  // Only allow digits
    if (value) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move focus to next input field
      if (event.nextSibling) {
        event.nextSibling.focus();
      }
    }
  };

  const handleKeyDown = (event, index) => {
    if (event.key === 'Backspace') {
      const newOtp = [...otp];
      newOtp[index] = '';  // Clear the current field
      setOtp(newOtp);

      // Move focus to the previous input field
      if (event.target.previousSibling) {
        event.target.previousSibling.focus();
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const otpValue = otp.join('');
    console.log("Verfy OTP otpSent => ",otpSent)

    const signupData={
      ...signUpData,
      otp:otpValue
    }
    
    dispatch(signUp(signupData,navigate))
    if (otpValue === otpSent) {
      setError(false)
    } else {
      setError(true)
    }
  };


  return (
    <div>
      {
        loader?
        (
          <Loader></Loader>
        )
        :
        (
          <div className="flex justify-center items-center h-screen bg-gray-100 pt-16">
            <div className="bg-richblack-900 border text-richblack-100 border-richblack-25 p-6 rounded-lg shadow-lg w-full max-w-md">
              <h2 className="text-2xl font-semibold text-gray-700 text-center mb-6">Verify OTP</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex justify-between text-richblack-900">
                  {otp.map((data, index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength="1"
                      value={data}
                      onChange={(e) => handleChange(e.target, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      className={`w-12 h-12 text-center text-lg rounded-lg focus:outline-none focus:ring-2 border-[2px] ${error?"border-pink-300":"border-caribbeangreen-300"}`}
                    />
                  ))}
                </div>

                {/* {error && <p className="text-white text-center mt-4">{error}</p>}
                {success && <p className="text-white text-center mt-4">OTP Verified Successfully!</p>} */}

                <button
                  type="submit"
                  className={`w-full py-2 mt-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all `}
                  // disabled={loading}
                >
                  {loading ? 'Verifying...' : 'Verify OTP'}
                </button>
              </form>
            </div>
          </div>
        )
      }
    </div>
  );
}

export default VerifyOtp;
