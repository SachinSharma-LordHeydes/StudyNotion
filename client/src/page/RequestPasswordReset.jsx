import React, { useState } from 'react';
import { sendResetPasswordMail } from '../services/operations/authOperation';
import { useDispatch, useSelector } from 'react-redux';
import Loader from './Loader';

function RequestPasswordReset() {

  const {loader}=useSelector((state)=>state.auth);

  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const dispatch =useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Clicked SendReset Password Link================== => ")
    if(!email){
      return;
    }
    dispatch(sendResetPasswordMail(email))
    setEmailSent(true);
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
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
              {!emailSent ? (
                <>
                  <h2 className="text-2xl font-semibold text-gray-700 text-center mb-4">
                    Forgot Your Password?
                  </h2>
                  <p className="text-gray-600 text-center mb-6">
                    Enter your email address below, and we will send you a link to reset your password.
                  </p>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
                    >
                      Send Reset Link
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center">
                  <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                    Check Your Email
                  </h2>
                  <p className="text-gray-600">
                    We have sent a password reset link to <strong>{email}</strong>.
                    Please check your inbox and follow the instructions.
                  </p>
                </div>
              )}
            </div>
          </div>
        )
      }
    </div>
  );
}

export default RequestPasswordReset;
