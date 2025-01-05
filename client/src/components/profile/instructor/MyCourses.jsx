import React, { useEffect } from 'react'
import YellowBlackBtn from '../../HomePage/YellowBlackBtn'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCourse, getCourseDetails, getInstructorCourses } from '../../../services/operations/courseOperation'
import { MdDelete, MdOutlinePublishedWithChanges } from "react-icons/md";
import { MdAccessTime } from "react-icons/md";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoPencilOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { setCurrentStep, setEditOrNextStatus } from '../../../features/profile/profileSlice';
import { setSectionData } from '../../../features/Courses/sectionSlice';





function MyCourses() {

  const {instructorAllCourses}=useSelector((state)=>state.course)
  const { token } = useSelector((state) => state.auth)

  const dispatch=useDispatch()

  const navigate=useNavigate()

  useEffect(()=>{
    dispatch(getInstructorCourses(token))
    console.log("instructorAllCourses=>",instructorAllCourses)
  },[])

  function addNewCourse(){
    dispatch(setCurrentStep(1))
    dispatch(setSectionData(null))
    dispatch(setEditOrNextStatus(1));
    navigate('/dashboard/add-course')
  }

  function editCourse(element){
    const id=element._id
    console.log("Edit Course",element,id)
    dispatch(getCourseDetails(id))
    dispatch(setEditOrNextStatus(0));
    dispatch(setCurrentStep(1))
    navigate('/dashboard/add-course')
  }

  function deleteCourseFunction(id){
    console.log("Delete event=> ",id)
    const courseID=id
    dispatch(deleteCourse(courseID))

    // console.log("Clicked Sub-Section index",index)

    // dispatch(setClickedSectionID(sectionData.courseContent[index]._id))
    // dispatch(setClickedCourseID(courseDetails?._id))
    // dispatch(setToDelete('Section'))

    // dispatch(setConfirmationDeleteModalStatus(!confirmDeleteModalState))
  }

  return (
    <div>
      <div className='flex justify-between items-center pt-16'>
        <div>
          <h1 className='text-4xl font-bold'>My Course</h1>
        </div>
        <div>
          <button onClick={addNewCourse}>
            <YellowBlackBtn colour={'Yellow'}><IoIosAddCircleOutline size={20} />New</YellowBlackBtn>
          </button>
        </div>
      </div>

      <div className='border-richblack-600 border-[1px] rounded-md' >
        <table className='w-[100%] '>
          <thead className='gap-x-16 border-richblack-600 border-b-[1px]'>
            <tr>
                <th className='w-[60%] text-start text-richblack-200 font-thin px-4 py-2'>COURSES</th>
                <th className='w-[20%] text-start text-richblack-200 font-thin px-4 py-2'>PRICE</th>
                <th className='w-[20%] text-start text-richblack-200 font-thin px-4 py-2'>ACTION</th>
            </tr>
          </thead>
          <tbody className=''>
            {
              instructorAllCourses?.data.map((element,index)=>(
                <div key={index}>
                  <tr >
                    <td className='px-5 py-2'>
                      <div className='flex my-4'>
                        <div className='mr-9' >
                          <img width={200} height={200} className='rounded-lg' src={element.thumbnail} alt="" />
                        </div>
                        <div>
                          <div>
                            <h1 className='text-xl text-richblack-5'>
                              {element.courseName}
                            </h1>
                          </div>
                          <div className='mt-3'>
                            <p className='text-sm text-richblack-400'>
                              {element.courseDescp}
                            </p>
                          </div>
                          <div className={`mt-3 w-fit border-blue-100 rounded-xl ${element.status==='Published'? 'text-yellow-50':"text-[#F37290]"}  px-2 py-1 bg-richblack-700`}>
                            <p className='flex items-center gap-x-2 text-sm'>
                              {
                              element.status==='Published'? <MdOutlinePublishedWithChanges />:<MdAccessTime />
                              }

                            <p className='text-xs'>
                              { element.status || "Draft"}
                            </p>
                            </p>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className='px-5 py-2 text-start '>
                      <p className='text-richblack-300 font-bold flex gap-x-1'>
                        <p>&#2352;&#2370;</p>
                        <p>{element.price}</p>
                      </p>
                    </td>
                    <td className='px-5 py-2 text-richblack-300'>
                      <div className='flex gap-x-2'>
                        <div onClick={()=>editCourse(element)} className='hover:cursor-pointer'>
                          <IoPencilOutline size={20} />
                        </div>
                        <div onClick={()=>deleteCourseFunction(element._id)} className='hover:cursor-pointer'>
                          <MdDelete size={20} />
                        </div>
                      </div>
                    </td>

                  </tr>
                </div>
              ))
              
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default MyCourses