import React from 'react'
import YellowBlackBtn from '../../HomePage/YellowBlackBtn'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentStep } from '../../../features/profile/profileSlice';
import { useForm } from 'react-hook-form';
import { addCourseStatus, editCourse } from '../../../services/operations/courseOperation';
import { useNavigate } from 'react-router-dom';

function Publish() {


  const {currentStep,success}=useSelector((state)=>state.profile)
  const { token } = useSelector((state) => state.auth)
  const {courseDetails } = useSelector((state) => state.course)

  const dispatch=useDispatch();

  const navigate=useNavigate()


  const {
    register,
    clearErrors,
    getValues,
    setError,
    formState: { errors },
  } = useForm();

  function draftHandler(){

    const statusValue = getValues('status');
    console.log('statusValue=>', statusValue)

    if(statusValue===false){
      const formData = new FormData()
      formData.append('status', false)
      formData.append('courseId', courseDetails._id)
  
      console.log('Course Details=>', courseDetails._id)
      clearErrors('status');
  
      dispatch(addCourseStatus(formData, token))

      if(success){
        navigate('/dashboard/my-courses')
      }
    }else{
      setError('status', {
        type: 'manual',
        message: 'To Save couse as Draft checkBox should be UnChecked',
      });
    }


  }

  function publishHandler(){

    const statusValue = getValues('status');
    console.log('statusValue=>', statusValue)

    if(statusValue===true){
      const formData = new FormData()
      formData.append('status', true)
      formData.append('courseId', courseDetails._id)

      console.log('Course Details=>', courseDetails._id)
      clearErrors('status');

      dispatch(addCourseStatus(formData, token))

      if(success){
        navigate('/dashboard/my-courses')
      }
    }else{
      setError('status', {
        type: 'manual',
        message: 'To Publish Course checkBox should be Checked',
      });
    }
    
  }

  // const sumbitData =(data)=>{
  //   console.log('data=>',data)
  //   const formData = new FormData()
  //   formData.append('status', data.status)
  //   formData.append('courseId', courseDetails._id)

  //   console.log('Course Details=>', courseDetails._id)

  //   dispatch(addCourseStatus(formData, token))
  // }

  return (
    <div>
     <form  action="">
      <div>
        <div className='bg-richblack-800 px-6 py-7 rounded-lg'>
          <div>
            <h1 className='text-xl font bold'>Publish Settings</h1>
          </div>

          <div className='items-center mt-9'>
            <input 
              className='mr-3 ' 
              type="checkbox" 
              name='status' 
              id='status'
              {...register('status')}
            />
            <label className='text-richblack-300' htmlFor="status">Make This Course Public</label>
            {errors.status && <p className='text-[#FF0000] text-xs'>{errors.status.message}</p>}
          </div>
        </div>
        <div className='mt-9 flex justify-between w-[90%] mx-auto'>
          <div>
            <button>
              <div onClick={()=>dispatch(setCurrentStep(currentStep - 1))}>
                <YellowBlackBtn>Back</YellowBlackBtn>
              </div>
            </button>
          </div>
          <div className='flex gap-x-4'>
            <div>
              <button type='button' onClick={draftHandler}>
                <YellowBlackBtn>Save as Draft</YellowBlackBtn>
              </button>
            </div>

            <div>
              <button type='button' onClick={publishHandler}>
                <YellowBlackBtn colour={'Yellow'}>Save and Public</YellowBlackBtn>
              </button>
            </div>
          </div>
        </div>
      </div>
     </form>
    </div>
  )
}

export default Publish