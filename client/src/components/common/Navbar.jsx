import { useEffect, useState } from 'react';
import { FaCaretDown } from "react-icons/fa6";
import { HiMenuAlt3 } from "react-icons/hi";
import { IoIosArrowDown } from "react-icons/io";
import { IoCart, IoClose, IoLogOut } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../assets/Logo/Logo-Full-Light.png';
import { NavbarLinks } from '../../data/navbar-links';
import { logOut } from '../../services/operations/authOperation';
import { getCatagory } from '../../services/operations/courseOperation';

function Navbar() {
  const { userData,loader } = useSelector((state) => state.auth);
  const { catagory } = useSelector((state) => state.course);

  const [clickOnPP, setClickOnPP] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true); // State to toggle Navbar visibility
  const [lastScrollY, setLastScrollY] = useState(window.scrollY); // Track last scroll position
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // Mobile menu state

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
        setShowNavbar(false);
      } else {
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

  const handelNvigateCatalog=(name)=>{
    console.log("Clicked",name)
    if(localStorage.getItem("userData")){
      console.log("true")
      navigate(`/catalog/${name}`)
    }else{
      console.log("false")
      navigate("/Signup")
    }
  }

  return (
    <div
      className={`text-white bg-richblack-900 py-3 px-2 border-b-[1px] border-richblack-300 fixed top-0 left-0 w-full z-50 transition-transform duration-300 ${
        showNavbar ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className='w-11/12 mx-auto flex justify-between items-center'>
        {/* Logo */}
        <Link to='/'>
          <img className='h-6 md:h-8' src={Logo} alt="Logo" />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className='hidden lg:block'>
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
                          <div 
                            key={index} 
                            onClick={()=>handelNvigateCatalog(cat.name)}
                          >
                            <div className='hover:bg-richblack-600 px-3 py-1 rounded-md'>
                              {cat.name}
                            </div>
                          </div>
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

        {/* Mobile Menu Button */}
        <button 
          className='lg:hidden text-2xl'
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <IoClose /> : <HiMenuAlt3 />}
        </button>

        {/* User Info - Desktop */}
        {userData && userData.token ? (
          <div className='hidden lg:flex gap-5'>
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
          <div className='hidden lg:flex gap-3'>
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

      {/* Mobile Menu Slide-out */}
      <div className={`lg:hidden fixed top-[60px] left-0 w-full h-screen bg-richblack-900 transform transition-transform duration-300 ${
        mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <nav className='px-6 py-4'>
          <ul className='flex flex-col gap-4'>
            {NavbarLinks.map((link, index) =>
              link.title === 'Catalog' ? (
                <div key={index}>
                  <p className='text-lg font-semibold mb-2'>{link.title}</p>
                  <div className='pl-4 flex flex-col gap-2'>
                    {catagory.length > 0 ? (
                      catagory.map((cat, catIndex) => (
                        <div 
                          key={catIndex} 
                          onClick={() => {
                            handelNvigateCatalog(cat.name);
                            setMobileMenuOpen(false);
                          }}
                          className='hover:text-caribbeangreen-200 cursor-pointer'
                        >
                          {cat.name}
                        </div>
                      ))
                    ) : (
                      <div>No categories available</div>
                    )}
                  </div>
                </div>
              ) : (
                <Link 
                  key={index} 
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <p className='text-lg'>{link.title}</p>
                </Link>
              )
            )}
            
            {/* Mobile User Actions */}
            {userData && userData.token ? (
              <div className='mt-6 border-t border-richblack-700 pt-4'>
                <div className='flex items-center gap-3 mb-4'>
                  <img
                    className='rounded-full size-10'
                    src={userData?.image || userData?.imageURL}
                    alt="Profile"
                  />
                  <div>
                    <p className='font-semibold'>{userData?.firstName} {userData?.lastName}</p>
                    <p className='text-sm text-richblack-300'>{userData?.email}</p>
                  </div>
                </div>
                {userData.accountType === 'Student' && (
                  <div 
                    className='flex items-center gap-3 py-2 hover:text-caribbeangreen-200 cursor-pointer'
                    onClick={() => {
                      goToHandler('/dashboard/cart');
                      setMobileMenuOpen(false);
                    }}
                  >
                    <IoCart className='text-xl' />
                    <span>Cart</span>
                  </div>
                )}
                <div 
                  className='flex items-center gap-3 py-2 hover:text-caribbeangreen-200 cursor-pointer'
                  onClick={() => {
                    goToHandler('/dashboard/my-profile');
                    setMobileMenuOpen(false);
                  }}
                >
                  <MdDashboard className='text-xl' />
                  <span>Dashboard</span>
                </div>
                <div 
                  className='flex items-center gap-3 py-2 hover:text-pink-200 cursor-pointer'
                  onClick={() => {
                    logOutHandler();
                    setMobileMenuOpen(false);
                  }}
                >
                  <IoLogOut className='text-xl' />
                  <span>Logout</span>
                </div>
              </div>
            ) : (
              <div className='flex flex-col gap-3 mt-6 border-t border-richblack-700 pt-4'>
                <Link to='/Login' onClick={() => setMobileMenuOpen(false)}>
                  <button className='w-full border-[1px] border-richblack-500 py-2 px-3 rounded-md'>
                    Log in
                  </button>
                </Link>
                <Link to='/Signup' onClick={() => setMobileMenuOpen(false)}>
                  <button className='w-full border-[1px] border-richblack-500 py-2 px-3 rounded-md'>
                    Sign up
                  </button>
                </Link>
              </div>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
