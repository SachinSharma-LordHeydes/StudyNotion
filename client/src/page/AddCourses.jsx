import React, { useEffect, useState } from 'react';
import { MdOutlineTipsAndUpdates } from "react-icons/md";
import CourseInfo from '../components/profile/instructor/CourseInfo';
import CourseBuilder from '../components/profile/instructor/CourseBuilder';
import Publish from '../components/profile/instructor/Publish';
import { useSelector } from 'react-redux';
import AddLectureModal from './AddLectureModal';
import Loader from './Loader';

const stepsData = [
  {
    step: 1,
    stepInfo: "Course Information"
  },
  {
    step: 2,
    stepInfo: "Course Builder"
  },
  {
    step: 3,
    stepInfo: "Publish"
  },
];

function AddCourses() {
  const { currentStep, modalState } = useSelector((state) => state.profile);
  const {loader}=useSelector((state)=>state.auth);

  useEffect(() => {
    console.log("Modal State=> ", modalState);
  }, [modalState]);

  function displayStepComponent(presentStep) {
    if (presentStep === 1) return <CourseInfo />;
    if (presentStep === 2) return <CourseBuilder />;
    if (presentStep === 3) return <Publish />;
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
          <div className='w-[95%] mx-auto pt-16 '>
            {/* {modalState && <AddLectureModal />} */}
            <div className={`transition-all duration-500 `}>
              <div>
                <h1 className='text-4xl font-bold mt-9'>Add Course</h1>
              </div>
              <div className='flex justify-between gap-x-9'>
                <div className='w-[60%]'>
                  <div className='flex justify-evenly mx-auto gap-x-4 mt-20 '>
                    {stepsData.map((element, index) => (
                      <div key={index} className='flex flex-col gap-y-2 justify-center items-center text-center w-[30%] relative'>
                        <div className='bg-richblack-700 rounded-full border-[2px] border-richblack-300 px-3 py-1'>
                          {element.step}
                        </div>
                        <div className='text-sm'>
                          {element.stepInfo}
                        </div>
                        <div className='absolute top-4 -right-24 items-start flex justify-start '>
                          {element.step < 3 ? (
                            <hr className=' h-4  border-richblack-25 border-dashed w-[165px] ' />
                          ) : (
                            <div />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className='mt-16'>
                    {displayStepComponent(currentStep)}
                  </div>
                </div>
                {/* Tips */}
                <div className="w-full md:w-[40%] md:max-w-[400px] fixed right-7">
                  <div className="sticky top-24 bg-richblack-800 p-6 rounded-lg">
                    <div className="flex items-center gap-x-5 text-lg font-semibold mb-4">
                      <MdOutlineTipsAndUpdates size={25} />
                      <div>Course Upload Tips</div>
                    </div>
                    <ul className="text-sm list-disc space-y-3 pl-5">
                      <li>Set the Course Price option or make it free.</li>
                      <li>Standard size for the course thumbnail is 1024x576.</li>
                      <li>Video section controls the course overview video.</li>
                      <li>Course Builder is where you create & organize a course.</li>
                      <li>Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</li>
                      <li>Information from the Additional Data section shows up on the course single page.</li>
                      <li>Make Announcements to notify any important notes to all enrolled students at once.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      }
    </div>
  );
}

export default AddCourses;