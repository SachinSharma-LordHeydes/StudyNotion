import React, { useEffect } from 'react';
import * as VscIcons from 'react-icons/vsc';
import { Link, useNavigate } from 'react-router-dom';

import {sidebarLinks} from '../../data/dashboard-links'
import { useDispatch, useSelector } from 'react-redux';
import { IoLogOut, IoSettingsSharp } from 'react-icons/io5';
import { logOut } from '../../services/operations/authOperation';

function SideNavBar() {

  const navigate=useNavigate();

  const {userData}=useSelector((state)=>state.auth)
  const dispatch=useDispatch()

  function gotoHandler(goto){
    navigate(goto)
  }

  const getIcon = (iconName) => {
    const IconComponent = VscIcons[iconName];
    return IconComponent ? <IconComponent size='20' /> : null;
  };

  function handelLogOut(){
    dispatch(logOut(navigate))
  }


  return (
    <div className='text-white min-h-screen mx-auto mt-12'>
      <div className=''>
        {
          sidebarLinks.map((elements,index)=>(
            <div key={index} className=''>
                <Link to={elements.path}>
                  {
                    userData?.accountType===elements?.type || elements.id===1 ?
                    (
                      <div className='flex items-center gap-4 mb-3 ml-2'>
                        <div className=''>
                          {
                            getIcon(elements.icon)
                          }
                        </div>
                        <div>
                          <button>{elements.name}</button>
                        </div>
                      </div>
                    ):
                    (
                      <div>
                      </div>
                    )
                  }
                </Link>
            </div>
          ))
        }
        <hr className='mt-9 mb-9 w-[90%] text-richblack-400 mx-auto' />
        <div>
          <div className='hover:cursor-pointer flex gap-4 ml-2 mb-3 items-center text-center'>
            <div>
              <IoSettingsSharp size={20} />
            </div>
            <div onClick={()=>gotoHandler('/dashboard/settings')}>Setting</div>
          </div>

          <div onClick={handelLogOut} className='hover:cursor-pointer flex gap-4 ml-2 mb-3 items-center text-center'>
            <div>
              <IoLogOut size={20} />
            </div>
            <div>
              Logout
            </div>
          </div>
        </div>

      </div>


    </div>
  )
}

export default SideNavBar