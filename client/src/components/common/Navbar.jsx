import React, { useEffect, useState } from 'react';
import Logo from '../../assets/Logo/Logo-Full-Light.png';
import { NavbarLinks } from '../../data/navbar-links';
import { IoIosArrowDown } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IoCart } from "react-icons/io5";
import { FaCaretDown } from "react-icons/fa6";
import { MdDashboard } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";
import { logOut } from '../../services/operations/authOperation';
import { getCatagory } from '../../services/operations/courseOperation';

function Navbar() {
  const { userData,loader } = useSelector((state) => state.auth);
  const { catagory } = useSelector((state) => state.course);

  const [clickOnPP, setClickOnPP] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true); // State to toggle Navbar visibility
  const [lastScrollY, setLastScrollY] = useState(window.scrollY); // Track last scroll position

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Fetch categories on component mount
  useEffect(() => {
    dispatch(getCatagory());
  }, [dispatch]);

  // Update profile picture when userData changes
  useEffect(() => {
    console.log("ptofilePicture------>",userData?.image,userData?.imageURL)
    console.log("Loader Navbar------>",loader)
  }, [userData,loader]);

  // Scroll Handler Logic
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        // Scrolling down: hide Navbar
        setShowNavbar(false);
      } else {
        // Scrolling up: show Navbar
        setShowNavbar(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll); // Cleanup listener
  }, [lastScrollY]);

  // Profile menu toggle
  const handleProfileClicks = () => {
    setClickOnPP(!clickOnPP);
  };

  // Navigation handlers
  const goToHandler = (goto) => navigate(goto);
  const logOutHandler = () => dispatch(logOut(navigate));

  return (
    <div
      className={`text-white bg-richblack-900 py-3 px-2 border-b-[1px] border-richblack-300 fixed top-0 left-0 w-full z-50 transition-transform duration-300 ${
        showNavbar ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className='w-11/12 mx-auto flex justify-between items-center'>
        {/* Logo */}
        <Link to='/'>
          <img className='h-8' src={Logo} alt="Logo" />
        </Link>

        {/* Navigation Links */}
        <nav>
          <ul>
            <li className='flex gap-x-4 tracking-wider'>
              {NavbarLinks.map((link, index) =>
                link.title === 'Catalog' ? (
                  <div key={index} className='group relative'>
                    <p className='flex gap-x-1 items-center cursor-pointer'>
                      {link.title} <IoIosArrowDown />
                    </p>
                    {/* Dropdown */}
                    <div
                      className='absolute hidden group-hover:flex group-hover:bg-richblack-800 flex-col px-4 py-3 w-52 rounded-lg -left-[70%] top-8 text-lg'
                      onMouseEnter={() => setShowNavbar(true)} 
                      onMouseLeave={() => setShowNavbar(true)}
                    >
                      {catagory.length > 0 ? (
                        catagory.map((cat, index) => (
                          <Link key={index} to={`/catalog/${cat.name}`}>
                            <div className='hover:bg-richblack-600 px-3 py-1 rounded-md'>
                              {cat.name}
                            </div>
                          </Link>
                        ))
                      ) : (
                        <div>No categories available</div>
                      )}
                    </div>
                  </div>

                ) : (
                  <Link key={index} to={link.path}>
                    <p>{link.title}</p>
                  </Link>
                )
              )}
            </li>
          </ul>
        </nav>

        {/* User Info */}
        {userData && userData.token ? (
          <div className='flex gap-5'>
            <div onClick={() => goToHandler('/dashboard/cart')}>
              {userData.accountType === 'Student' && <IoCart />}
            </div>
            <div onClick={handleProfileClicks} className='relative'>
              <div className='flex items-center gap-x-2'>
                <div className=''>
                  <img
                    className='rounded-full size-7'
                    src={userData?.image || userData?.imageURL}
                    alt={userData?.imageURL}
                  />
                </div>
                <div>
                  <FaCaretDown />
                </div>
              </div>
              {/* Dropdown Menu */}
              <div
                className={`bg-richblack-900  absolute top-9 z-50 -right-3 border border-richblack-50 px-5 py-3 ${
                  clickOnPP ? 'block' : 'hidden'
                }`}
              >
                <div className='flex gap-x-3 items-center' onClick={() => goToHandler('/dashboard/my-profile')}>
                  <MdDashboard />
                  <div>
                    Dashboard
                  </div> 
                </div>
                <hr className='my-2' />
                <div className='flex gap-x-3 items-center' onClick={logOutHandler}>
                  <IoLogOut /> 
                  <div>
                    Logout
                  </div> 
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className='flex gap-3'>
            <Link to='/Login'>
              <button className='border-[1px] border-richblack-500 py-1 px-3 rounded-md'>
                Log in
              </button>
            </Link>
            <Link to='/Signup'>
              <button className='border-[1px] border-richblack-500 py-1 px-3 rounded-md'>
                Sign up
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
