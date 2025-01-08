import React, {useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { addToCart, buyCourse, getCourseDetails, removeFromCart } from '../services/operations/courseOperation';
import { getAllSection } from '../services/operations/sectionOperations';
import { MdLaptopChromebook } from "react-icons/md";
import FoundingStory from "../assets/Images/FoundingStory.png";


import { FaAngleDown } from "react-icons/fa";
import { FaAngleUp } from "react-icons/fa";
import { PiCursorLight } from "react-icons/pi";
import { CiViewList } from "react-icons/ci";
import { PiCertificateThin } from "react-icons/pi";

import YellowBlackBtn from '../components/HomePage/YellowBlackBtn';
import Loader from './Loader';


function ClickedCourseDetail() {
  const { courseDetails } = useSelector((state) => state.course);
  const { allSectionData } = useSelector((state) => state.section);
  const { userData,loader } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate=useNavigate()
  const { catagoryName, id } = useParams();

  const [clicked, setClicked] = useState(null);

  useEffect(() => {
    dispatch(getCourseDetails(id));
    dispatch(getAllSection(id));
  }, [id,dispatch,]);


  const [cartArray,setCartArray]=useState([])
  const [enrolledCoursesArray,setEnrolledCoursesCartArray]=useState([])
  const cartArray2=userData.cart


  useEffect(() => {
    // if (userData?.courseEnrolled?.includes(courseDetails?._id)) {
    //   console.log("-----------True-----------")
    // }
    // else{
    //   console.log("-----------False-----------")
    // }
    setEnrolledCoursesCartArray(userData.courseEnrolled.map((items)=>items._id))
      console.log("Enrolled Courses------>",enrolledCoursesArray)
  }, [userData]);


  useEffect(() => {
    if (userData?.cart) {
      const cartIds = userData.cart.map((item) => item._id);
      setCartArray(cartIds);
    }
  }, [userData]);
  
  useEffect(() => {
    console.log("All section Data => ", allSectionData);
    console.log("Course Details => ", courseDetails);
    console.log("auth Details =====> ", userData);
    console.log("cartArray2 Details =====> ", cartArray2);
    console.log("cartArray Details =====> ", cartArray);
  }, [allSectionData, courseDetails, userData,cartArray,cartArray2]);


  // Toggle function for a specific section
  const handleClick = (index) => {
    setClicked(clicked === index ? null : index); // Toggle the clicked section
  };

  function handelCollapse(){
    setClicked(null)
  }


// Function to add to cart


// Function for Add To Cart button
function handelAddCart() {
  console.log("AddCart Clicked");

  if (courseDetails && courseDetails?._id && userData && userData.token) {
    console.log("token------------>",userData.token)
    dispatch(addToCart(courseDetails?._id, userData.token));
    console.log("cart added------------>",userData)
  } else {
    console.error("Required details for adding to cart are missing.");
    console.log("token------------>",courseDetails?._id)
    console.log("id------------>",userData.token)
  }
}


function handelRemoveCart() {
  console.log("remove Clicked---------------->",);

  if (courseDetails && courseDetails?._id && userData && userData.token) {
    dispatch(removeFromCart(courseDetails._id, userData.token));
    console.log("cart removed------------>",userData)
  } else {
    console.error("Required details for removing to cart are missing.");
  }
}

  const handelBuy=async (itemId, totalPrice,user)=>{
    console.log("Buy Clicked----------->",itemId, totalPrice)
    dispatch(buyCourse(itemId, totalPrice,user))
  }

  const GotoEnrolledCourses =()=>{
    navigate("/dashboard/enrolled-courses")
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
          <div className="text-md text-white relative pt-14">
            <div>
              <div className="bg-richblack-700 text-white">
                <div className="mx-auto w-[90%] flex">
                  <div className="w-[70%] py-9">
                    <div>
                      <div className="flex gap-x-1 text-richblack-100">
                        <p>Home /</p>
                        <p>Catalog /</p>
                        <p className="text-yellow-50">{catagoryName}</p>
                      </div>

                      <div>
                        <h1>{courseDetails?.courseName}</h1>
                      </div>

                      <div>{courseDetails?.courseDescp}</div>

                      <div>
                        (Rating) (Stars) (No.of Ratings)
                      </div>

                      <div>Created by {allSectionData?.instructor?.firstName}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-richblack-900 w-[90%] mx-auto text-white mt-5 ">
                <div className="w-[70%]">
                  <div className="border-[0.1px] border-richblack-200 p-5">
                    <h1 className="text-3xl">What Will you Learn</h1>
                    <p className="mt-5 text-sm">{courseDetails?.whatWillYouLearn}</p>
                  </div>
                </div>
              </div>

              <div className="bg-richblack-900 w-[90%] mx-auto text-white mt-5 ">
                <div className="w-[70%]">
                  <h1 className="text-3xl">Course Content</h1>
                  <div className="flex justify-between my-2">
                    <div className="text-sm space-x-3">
                      <span>{courseDetails?.courseContent.length} Sections</span>
                      <span>lecture</span>
                    </div>

                    <div>
                      <button onClick={handelCollapse} className="text-yellow-200 text-sm">Collapse all section</button>
                    </div>
                  </div>
                  <div className="border-[0.1px] border-richblack-500">
                    {allSectionData?.courseContent.map((element, index) => (
                      <div key={index}>
                        <div
                          onClick={() => handleClick(index)}
                          className="py-3 px-7 bg-richblack-700 border-b-[1px] flex justify-between items-center border-richblack-500 hover:cursor-pointer"
                        >
                          <div className='flex items-center'>
                            <div className="">
                              {clicked === index ? (
                                <FaAngleUp /> // Show "up" arrow if the section is open
                              ) : (
                                <FaAngleDown /> // Show "down" arrow if the section is closed
                              )}
                            </div>

                            <div>
                              <p className="px-4">{element.sectionName}</p>
                            </div>
                          </div>

                          <div>
                            <p className='text-yellow-200 text-sm'>{element?.subSection.length} Lectures</p>
                          </div>
                        </div>

                        {clicked === index && (
                          <div className="pl-10 py-2">
                            <div>
                              {
                                element.subSection.length!==0?
                                (
                                  <div>
                                    {
                                      element?.subSection.map((ele,index)=>(
                                        <div key={index}>
                                            <div className='flex items-center gap-x-3 px-9'>
                                              <div>
                                                <MdLaptopChromebook />
                                              </div>
                                              <div>
                                                {ele.title}
                                              </div>
                                            </div>
                                        </div>
                                      ))
                                    }
                                  </div>
                                )
                                :
                                (
                                  <div>
                                    <p className='px-9'>Not yet uploaded !!</p>
                                  </div>
                                )
                              }
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>


                  <div className='mt-9'>

                  <div>
                      <div>
                        <h1 className='font-bold text-3xl'>AUTHOR</h1>
                      </div>
                      <div className='flex items-center gap-x-5 my-5'>
                        <div className='' >
                          <img className='rounded-full items-center' height={55} width={55} src={`${allSectionData?.instructor?.image}`} alt="imagehere" />
                        </div>
                        <div className='flex gap-x-2 font-bold text-xl items-center text-center'>
                          <div>{allSectionData?.instructor?.firstName}</div>
                          <div>{allSectionData?.instructor?.lastName}</div>
                        </div>
                      </div>
                    </div>

                    <div className=''>
                        <p className='text-sm'>
                          {allSectionData?.instructor?.addDetail?.about}
                        </p>
                    </div>

                  </div>

                </div>
              </div>
            </div>



            <div className='bg-richblack-500 fixed w-[25%] top-24 right-12 rounded-xl'>
              <div>
                <img className='rounded-xl h-44 w-full' src={FoundingStory} alt="pics here" />
              </div>
              <div className='px-3 text-richblack-5'>
                <div className='mt-5'>
                  <p className='font-bold text-xl'>
                    Rs {allSectionData?.price}
                  </p>
                </div>
                <div className='space-y-2 mt-5'>
                  {

                    enrolledCoursesArray?.includes(courseDetails?._id)?
                    (
                      <div onClick={()=>GotoEnrolledCourses()}>
                        <YellowBlackBtn  colour='Yellow'>Visite</YellowBlackBtn>
                      </div>
                    )
                    :
                    (  
                      <div onClick={()=>handelBuy(courseDetails?._id,courseDetails?.price,userData?._id)}>
                        <YellowBlackBtn  colour='Yellow'>Buy Now</YellowBlackBtn>
                      </div>
                    )
                  }
                  <div>
                    <YellowBlackBtn  colour='Black'>
                      {
                        cartArray?.includes(courseDetails?._id)?
                        (
                          <div onClick={handelRemoveCart}>
                            Remove From Cart
                          </div>
                        ):
                        (
                          <div onClick={handelAddCart}>
                            Add to Cart
                          </div>
                        )
                      }
                    </YellowBlackBtn>
                  </div>
                  <p className='text-sm text-center text-richblack-50'>30-Day Money Back Gurantee</p>
                </div>
                <div className='mt-5 text-caribbeangreen-100'>
                  <p className='text-richblack-5 text-sm'>This Course Includes:</p>
                  <div className='flex gap-x-2 items-center text-xs'><PiCursorLight/> Lifetime Acces</div>
                  <div className='flex gap-x-2 items-center text-xs'><CiViewList/> Access on Mobile And TV</div>
                  <div className='flex gap-x-2 items-center text-xs'><PiCertificateThin/> Certificate of Completion</div>

                </div>
                <div className='flex justify-center my-4 text-yellow-100 hover:cursor-pointer'>
                  Share
                </div>
              </div>
            </div>
          </div>
        )
      }
    </div>
  );
}

export default ClickedCourseDetail;
