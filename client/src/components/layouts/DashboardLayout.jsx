import { Outlet } from 'react-router-dom';
import SideNavBar from '../profile/SideNavBar';

function DashboardLayout() {

  return (
    <div className='text-white flex flex-col md:flex-row gap-4 md:gap-6 lg:gap-11 pt-16 md:pt-20'>
      <div className='w-full md:w-64 lg:w-72 bg-richblack-800 md:min-h-screen'>
        <SideNavBar />
      </div>
      <div className='w-full md:flex-1 px-4 md:px-0 md:pr-4'>
        <Outlet />
      </div>
    </div>
  );
}

export default DashboardLayout;