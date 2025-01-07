import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword, sendResetPasswordMail } from '../services/operations/authOperation';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import Loader from './Loader';

function ResetPassword() {

  const {loader}=useSelector((state)=>state.auth);

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const dispatch=useDispatch();
  const location =useLocation();
  const navigate=useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match!');
    } else {
      setError('');
      const token=location.pathname.split('/').at(-1);
      console.log("Token => ",token)
      const data={
        password,
        confirmPassword,
        token
      }
      dispatch(sendResetPasswordMail(data))
      navigate('/Login')
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
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
              <h2 className="text-2xl font-semibold text-gray-700 text-center mb-6">
                Reset Your Password
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                {error && (
                  <p className="text-red-500 text-center mt-4">{error}</p>
                )}
                <button
                  type="submit"
                  className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
                >
                  Reset Password
                </button>
              </form>
            </div>
          </div>
        )
      }
    </div>
  );
}

export default ResetPassword;
