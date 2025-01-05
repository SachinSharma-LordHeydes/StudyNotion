import React from 'react';
import { Outlet } from 'react-router-dom';
import SideNavBar from '../profile/SideNavBar';

function DashboardLayout() {

  return (
    <div className='text-white flex gap-11 pt-16'>
      <div className='w-[15%] bg-richblack-800'>
        <SideNavBar />
      </div>
      <div className='w-[80%]'>
        <Outlet />
      </div>
    </div>
  );
}

export default DashboardLayout;