import React from 'react'
import HighligthText from '../components/HomePage/HighligthText'
import about1 from '../assets/Images/aboutus1.webp'
import about2 from '../assets/Images/aboutus2.webp'
import about3 from '../assets/Images/aboutus3.webp'
import foundingStory from '../assets/Images/FoundingStory.png'
import LearningGrid from '../components/about/LearningGrid'
import ContactForm from '../components/contact/ContactForm'
import { useSelector } from 'react-redux'
import Loader from './Loader'

const data=[
  {
    h1:'5K',
    p:"Active Students"
  },
  {
    h1:'10+',
    p:"Mentors"
  },
  {
    h1:'200+',
    p:"Courses"
  },
  {
    h1:'50+',
    p:"Awards"
  },
]


function About() {
  
  const {loader}=useSelector((state)=>state.auth);

  return (
    <div>
      {
        loader?
        (
          <Loader></Loader>
        )
        :
        (
          <div className='text-white mx-auto w-11/12 pt-24'>
            {/* section 1 */}

            <div className=''>

              <div className='felx justify-center text-center items-center'>
                <h1 className='text-4xl'>
                  Driving Innovation in Online Education for a
                </h1>
                <h1 className='text-4xl'>
                  <HighligthText text={"Brighter Future"}></HighligthText>
                </h1>

                <div className='flex justify-center text-center mt-7'>
                  <p className='text-richblack-300 w-[70%] font-semibold'>
                    Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.
                  </p>
                </div>

              </div>

              <div className='mt-14'>

                <div className='flex gap-7 justify-between'>
                  <img src={about1} alt="" />
                  <img src={about2} alt="" />
                  <img src={about3} alt="" />
                </div>

                <div className='flex justify-center text-center'>
                  <p className='text-4xl mt-9'>
                    We are passionate about revolutionizing the way we learn. Our innovative platform <HighligthText text={"combines technology"}></HighligthText>, <HighligthText text={"expertise"} colour={"bg-gradient-to-t from-[#F87117] to-[#EF4543]"}></HighligthText>, and community to create an <HighligthText text={"unparalleled educational experience."} colour={"bg-gradient-to-t from-[#F9C417] to-[#F04D41]"}></HighligthText>
                  </p>
                </div>

              </div>

              <hr className='text-richblack-500 mt-20 mb-20' />

            </div>

            {/* --------------------------------------------------------- */}

            {/* section 2 */}

            <div className=''>

              <div className='flex justify-between items-center font-thin'>
              <div className='w-[50%]'>
                <h1 className='text-4xl'>
                  <HighligthText text={"Our Founding Story"} colour={'bg-gradient-to-tl from-[#F8C717] to-[#9E1A4B]'}></HighligthText>
                  </h1>
                  <p className='mt-16 text-richblack-200'>
                    Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.
                  </p>
                  <p className='mt-16 text-richblack-200 font-thin'>
                    As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.
                  </p>
                </div>
              <div className='w-50%'>
                  <img className='shadow-[0px_0px_20px_0px_#c53030,0px_3px_8px_0px_#00000024]' src={foundingStory} alt="" />
              </div>


              </div>
              <div className='flex justify-between mt-44'>
                <div className='w-[40%]' >
                  <h1 className='text-4xl'>
                    <HighligthText text={"Our Vision"} colour={"bg-gradient-to-t from-[#F9C417] to-[#F04D41]"}></HighligthText>
                  </h1>
                  <p className='text-richblack-300 mt-9'>
                    With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.
                  </p>
                </div>
                <div className='w-[40%]'>
                  <h1 className='text-4xl'>
                    <HighligthText text={"Our Mission"}></HighligthText>
                  </h1> 
                  <p className='text-richblack-300 mt-9'>
                    With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.
                  </p>
                </div>


              </div>
                
              <div className='flex px-20 py-9 text-center items-center mt-28 justify-between bg-richblack-700'>
                {
                  data.map((e,index)=>(
                    <div key={index} className='flex flex-col text-center '>
                      <h1 className='text-4xl font-bold'>
                        {e.h1}
                      </h1>
                      <p className='text-richblack-200 text-lg'>
                        {e.p}
                      </p>
                    </div>
                  ))
                }
              </div>

            </div>

            {/* --------------------------------------------------------- */}


            {/* section 3 */}

            <div className='mt-24'>

              <LearningGrid></LearningGrid>

            </div>

            {/* --------------------------------------------------------- */}




            {/* section 4 */}

            <div className='flex justify-center items-center text-center mt-28'>
              <div className=''>
                <h1 className='text-4xl font-semibold'>
                  Get in Touch
                </h1>
                <p className='text-richblack-500 mt-2'>
                  We'd love to here for you, Please fill out this form.
                </p>
              </div>
            </div>


            <div className='items-center flex justify-center mx-auto w-[40%]'>
              <ContactForm></ContactForm>
            </div>

            {/* --------------------------------------------------------- */}
          </div>
        )
      }
    </div>
  )
}

export default About