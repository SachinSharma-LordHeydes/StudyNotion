import React, { useEffect, useState } from 'react'
import DropzoneFileInput from '../../common/DropzoneFileInput'
import { RxCross2 } from "react-icons/rx"
import YellowBlackBtn from '../../HomePage/YellowBlackBtn'
import { RiArrowRightWideFill } from "react-icons/ri"
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentStep } from '../../../features/profile/profileSlice'
import { useForm } from 'react-hook-form'
import { createCourse, editCourse, getCatagory } from '../../../services/operations/courseOperation'
import { setThumbnailPreview } from '../../../features/Courses/coursesSlice'

function CourseInfo() {
  const [tags, setTags] = useState([])
  const { currentStep, editOrNextStatus,success } = useSelector((state) => state.profile)
  const { catagory, courseDetails } = useSelector((state) => state.course)
  const { token,userData } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: {
      thumbnail: null,
      requirement: '',
    }
  })

  useEffect(()=>{
    console.log("CourseInfo userData-------->",userData,courseDetails)
    console.log("CourseInfo CourseDetails-------->",courseDetails)
  },[])

  useEffect(() => {
    console.log("courseDetails&&editOrNextStatus",courseDetails,editOrNextStatus)
    if (courseDetails && editOrNextStatus===0) {
      setValue('courseName', courseDetails.courseName)
      setValue('courseDescp', courseDetails.courseDescp)
      setValue('price', courseDetails.price)
      setValue('catagory', courseDetails.catagoryName)
      setValue('whatWillYouLearn', courseDetails.whatWillYouLearn)

      if (courseDetails.thumbnail) {
        dispatch(setThumbnailPreview(courseDetails.thumbnail))
      }
    }
  }, [courseDetails, setValue, dispatch])

  // Separate useEffect specifically for handling tags initialization
  useEffect(() => {
    if (courseDetails && editOrNextStatus===0) {
      let initialTags = []
      
      // Handle different possible formats of courseTag
      if (courseDetails.courseTag) {
        if (Array.isArray(courseDetails.courseTag)) {
          initialTags = courseDetails.courseTag
        } else if (typeof courseDetails.courseTag === 'string') {
          try {
            // Try parsing if it's a JSON string
            const parsedTags = JSON.parse(courseDetails.courseTag)
            initialTags = Array.isArray(parsedTags) ? parsedTags : [parsedTags]
          } catch (error) {
            // If parsing fails, treat it as a single tag
            initialTags = [courseDetails.courseTag]
          }
        }
      }

      console.log('Initializing tags:', initialTags)
      setTags(initialTags)
    }
  }, [courseDetails])

  const handleAddTag = () => {
    const newTag = getValues('requirement')
    if (!newTag || newTag.trim() === '') return

    setTags(prevTags => [...prevTags, newTag.trim()])
    setValue('requirement', '') // Clear the input after adding
    clearErrors('requirement') // Clear any errors since we now have tags
  }

  const handleDeleteTag = (indexToDelete) => {
    setTags(prevTags => prevTags.filter((_, index) => index !== indexToDelete))
  }

  function handelGetCourses(){
    dispatch(getCatagory())
  }

  const onSubmit = (data) => {
    try {
      if (tags.length === 0) {
        setError('requirement', {
          type: 'manual',
          message: 'At least one tag is required'
        })
        return
      }

      const formData = new FormData()
      
      // Add form fields
      formData.append('courseName', data.courseName)
      formData.append('courseDescp', data.courseDescp)
      formData.append('price', data.price)
      formData.append('catagory', data.catagory)
      formData.append('whatWillYouLearn', data.whatWillYouLearn)
      formData.append('courseTag', JSON.stringify(tags))

      // Handle thumbnail
      if (editOrNextStatus === 1) {
        if (!data.thumbnail) {
          setError('thumbnail', {
            type: 'manual',
            message: 'Thumbnail is required for new courses'
          })
          return
        }
        formData.append('thumbnail', data.thumbnail)
      } else {
        if (data.thumbnail instanceof File) {
          formData.append('thumbnail', data.thumbnail)
        } else if (courseDetails?.thumbnail) {
          formData.append('thumbnail', courseDetails.thumbnail)
        } else {
          setError('thumbnail', {
            type: 'manual',
            message: 'Thumbnail is required'
          })
          return
        }
      }

      // Submit the form
      if (editOrNextStatus === 1) {
        dispatch(createCourse(formData, token))
      } else {
        formData.append('id', courseDetails._id)
        dispatch(editCourse(formData, token))
      }

      if(success){
        dispatch(setCurrentStep(currentStep + 1))
      }
      
    } catch (error) {
      console.error("Error in form submission:", error)
    }
  }

  return (
    <div className='bg-richblack-800 px-6 py-7 rounded-lg'>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Other form fields remain the same */}
        <div className='space-y-9'  ></div>     
        <div className='flex flex-col space-y-2'>
           <label htmlFor="courseName">Course Title</label>
           <input 
             type="text" 
             name="courseName" 
             id="courseName"
             className='bg-richblack-600 rounded-md px-4 py-2 text-lg '
             {...register('courseName',{ required: true })}
           />
           {errors.courseName && <p className='text-[#FF0000] text-xs'>Course Title is required *</p>}
         </div>
         <div className='flex flex-col space-y-2'>
           <label htmlFor="courseDescp">Course Short Description</label>
           <textarea 
             rows={5}
             type="text" 
             name="courseDescp" 
             id="courseDescp" 
             className='bg-richblack-600 rounded-md px-4 py-2 text-lg min-h-[150px]'
             {...register('courseDescp',{ required: true })}
           />
           {errors.courseDescp && <p className='text-[#FF0000] text-xs'>Course Description is required *</p>}
         </div>
         <div className='flex flex-col space-y-2 relative'>
           <label htmlFor="price">Course Price</label>
           <input 
             type="Number" 
             name="price" 
             id="price" 
             className='bg-richblack-600 rounded-md px-4 py-2 text-lg pl-10 '
             {...register('price',{ required: true })}
           />
           {errors.price && <p className='text-[#FF0000] text-xs'>coursePrice is required *</p>}
           <span className='absolute top-9 left-4'>रू</span>
         </div>
         <div onClick={handelGetCourses} className='flex flex-col space-y-2'>
           <label htmlFor="catagory">Catagory</label>
           <div >
             <select 
               name='catagory'
               id='catagory'
               className='bg-richblack-600 rounded-md px-4 py-3 text-lg w-full'
               {...register('catagory',{ required: true })}
             >
               {
                 catagory.map((element,index)=>(
                   <option key={index}>
                     {element.name}
                   </option>
                 ))
               }
             </select>
           </div>
           {errors.catagory && <p className='text-[#FF0000] text-xs'>Catagory is required *</p>}
         </div>
         <div  className='flex flex-col space-y-2'>
           <label htmlFor="thumbnail">Course Thumbnail</label>
           <DropzoneFileInput 
              register={register} 
              setValue={setValue}
              clearErrors={clearErrors}
              thumbnailPreview={courseDetails?.thumbnail}
            />
           {errors.thumbnail && <p className='text-[#FF0000] text-xs'>{errors.thumbnail.message}</p>}
         </div>
         <div className='flex flex-col space-y-2'>
           <label htmlFor="whatWillYouLearn">Benefits of the course</label>
           <textarea 
             type="text" 
             name="whatWillYouLearn" 
             id="whatWillYouLearn" 
             className='bg-richblack-600 rounded-md px-4 py-2 text-lg min-h-[90px]'
             {...register('whatWillYouLearn',{ required: true })}
           />
           {errors.whatWillYouLearn && <p className='text-[#FF0000] text-xs'>Benefits of the course is required *</p>}
         </div>     

         <div className='space-y-2'>        
          <label htmlFor="requirement">Tags</label>        
          <div className='flex gap-2'>
            <input 
              type="text" 
              id="requirement"
              className='bg-richblack-600 rounded-md px-4 py-2 text-lg flex-1'
              {...register('requirement', { required: tags.length === 0 })}
            />
            <button 
              type="button"
              onClick={handleAddTag}
              className='bg-yellow-50 text-black px-4 py-2 rounded-md hover:bg-yellow-100'
            >
              Add Tag
            </button>
          </div>
          {errors.requirement && (
            <p className='text-[#FF0000] text-xs'>{errors.requirement.message || 'At least one tag is required *'}</p>
          )}
        </div>

        <div className='mt-3 px-3'>
          <ul className='text-sm text-richblack-5 space-y-2 list-disc'>
            {tags.map((tag, index) => (
              <div key={index} className='flex items-center gap-x-4'>
                <li>{tag}</li>
                <button
                  type="button"
                  onClick={() => handleDeleteTag(index)}
                  className='p-1 rounded-full bg-yellow-50 hover:cursor-pointer'
                >
                  <RxCross2 color='red' size={15}/>
                </button>
              </div>
            ))}
          </ul>
        </div>

        <div className='flex justify-end mt-6'>
          <div className='w-[20%]'>
            <button type='submit'>
              <YellowBlackBtn colour={'Yellow'}>
                Next <RiArrowRightWideFill />
              </YellowBlackBtn>
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default CourseInfo