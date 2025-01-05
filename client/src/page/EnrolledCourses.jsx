import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../services/operations/authOperation';
import { getCourseDetails } from '../services/operations/courseOperation';
import { useNavigate } from 'react-router';
import Loader from './Loader';

function EnrolledCourses() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userData,loader } = useSelector((state) => state.auth);


  useEffect(() => {
    dispatch(getUserDetails(userData._id));
  }, [dispatch]);

  const [selectedStatus, setSelectedStatus] = useState('All');

  function handleStatusNavbar(event) {
    const clickedStatus = event.target.textContent.trim();
    if (['All', 'Pending', 'Completed'].includes(clickedStatus)) {
      setSelectedStatus(clickedStatus);
    }
  }

  const goToVideoPlayer=(event,id)=>{
    console.log("Course Clicked -------->",event)
    console.log("Course ID Clicked -------->",id)
    dispatch(getCourseDetails(id))
    navigate("/watch-lectures")
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
          <div className="p-6">
            {/* Path */}
            <div className="flex text-sm text-richblack-200 mt-9 space-x-1">
              <p>HOME / </p>
              <p> DASHBOARD / </p>
              <p className="text-yellow-50"> ENROLLED COURSES</p>
            </div>

            {/* Title */}
            <div className="text-3xl font-bold mt-9">
              <p>Enrolled Courses</p>
            </div>

            {/* Status Navbar */}
            <div
              onClick={(event) => handleStatusNavbar(event)}
              className="flex py-3 px-7 bg-richblack-700 space-x-4 rounded-full max-w-fit mt-12"
            >
              <div
                className={`px-3 py-1 hover:bg-richblack-900 rounded-full ${
                  selectedStatus === 'All' ? 'bg-richblack-900 rounded-full' : ''
                }`}
              >
                All
              </div>
              <div
                className={`px-3 py-1 hover:bg-richblack-900 rounded-full ${
                  selectedStatus === 'Pending' ? 'bg-richblack-900 rounded-full' : ''
                }`}
              >
                Pending
              </div>
              <div
                className={`px-3 py-1 hover:bg-richblack-900 rounded-full ${
                  selectedStatus === 'Completed' ? 'bg-richblack-900 rounded-full' : ''
                }`}
              >
                Completed
              </div>
            </div>

            {/* Table */}
            <div className="mt-8 bg-richblack-800 rounded-md">
              {/* Table Header */}
              <div className="flex items-center px-6 py-3 bg-richblack-700 rounded-t-md text-sm text-richblack-100 font-medium">
                <div className="w-1/2">Course Name</div>
                <div className="w-1/4">Duration</div>
                <div className="w-1/4">Progress</div>
              </div>

              {/* Table Body */}
              <div>
                {userData?.courseEnrolled?.map((course, index) => (
                  <div
                    onClick={(event)=>goToVideoPlayer(event,course._id)}
                    key={index}
                    className="flex items-center px-6 py-4 border-b border-richblack-600 text-richblack-200 text-sm hover:bg-richblack-700"
                  >
                    {/* Course Details */}
                    <div className="w-1/2 flex items-center space-x-4">
                      <img
                        src={course.thumbnail}
                        alt="Course"
                        className="w-12 h-12 rounded-md object-cover"
                      />
                      <div>
                        <p className="font-medium">{course.courseName}</p>
                        <p className="text-xs text-richblack-400">{course.courseDescp}</p>
                      </div>
                    </div>

                    {/* Duration */}
                    <div className="w-1/4">{course.duration}</div>

                    {/* Progress */}
                    <div className="w-1/4">
                      <div className="relative w-full h-2 bg-richblack-600 rounded-full">
                        <div
                          className={`absolute top-0 left-0 h-2 rounded-full ${
                            course.progress === 'Completed'
                              ? 'bg-green-500'
                              : 'bg-blue-500'
                          }`}
                          style={{
                            width: course.progress === 'Completed'
                              ? '100%'
                              : `${course.progress}%`,
                          }}
                        ></div>
                      </div>
                      <p className="text-xs mt-1">
                        {course.progress === 'Completed'
                          ? 'Completed'
                          : `Progress ${course.progress}%`}
                      </p>
                    </div>
                  </div>
                ))}

                {/* No Courses Fallback */}
                {(!userData?.courseEnrolled || userData.courseEnrolled.length === 0) && (
                  <div className="px-6 py-4 text-center text-richblack-400">
                    No courses enrolled yet.
                  </div>
                )}
              </div>
            </div>
          </div>
        )
      }
    </div>
  );
}

export default EnrolledCourses;
