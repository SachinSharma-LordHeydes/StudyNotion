import YellowBlackBtn from '../components/HomePage/YellowBlackBtn';
import { RiEditBoxLine } from "react-icons/ri";
import Dashboard from '../components/profile/Dashboard.';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { useSelector } from 'react-redux';
import Loader from './Loader';



function Profile() {

  const {loader}=useSelector((state)=>state.auth);

  const navigate=useNavigate();


  function handlePageChage(){
    navigate('/dashboard/settings')
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
          <div className='text-white mx-auto pt-16'>

            <div className='px-9' >

              <div className='flex justify-between items-center'>
                <div>
                  <h1 className='text-4xl'>My Profile</h1>
                </div>
                <div onClick={handlePageChage} className={``}>
                  <YellowBlackBtn colour={'Yellow'}>Edit <RiEditBoxLine /></YellowBlackBtn>
                </div>
              </div>

              <div>
                <Dashboard></Dashboard>
              </div>

            </div>
          </div>
        )
      }
    </div>
  )
}

export default Profile