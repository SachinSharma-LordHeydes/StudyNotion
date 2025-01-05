import React from 'react';
import { TbMessageChatbotFilled } from "react-icons/tb";
import { FaGlobeAmericas } from "react-icons/fa";
import { IoCall } from "react-icons/io5";
import ContactForm from '../components/contact/ContactForm'
import Loader from './Loader';
import { useSelector } from 'react-redux';



const data=[
  {
    logo:TbMessageChatbotFilled,
    h1:"Chat on us",
    p:"Our friendly team is here to help.info@studynotion.com"
  },
  {
    logo:FaGlobeAmericas,
    h1:"Visit us",
    p:"Come and say hello at our office HQ.Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016"
  },
  {
    logo:IoCall,
    h1:"Call us",
    p:`Mon - Fri From 8am to 5pm +123 456 7869`
  },
  
]

function Contact() {

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
            <div className='flex justify-between items-start gap-x-9'>
              <div className='w-[40%] p-9 bg-richblack-800 rounded-xl'>
                {
                  data.map((element,index)=>(
                    <div key={index} className='mb-9'>
                      <div className='flex gap-x-2 text-center items-center'>
                        <div>
                        <element.logo className='text-2xl' />
                        </div>
                        <div className='text-2xl font-bold'>
                          {element.h1}
                        </div>
                      </div>
                      <div>
                        <p className='text-sm font-semibold text-richblack-100 w-[80%]'>
                          {element.p}
                        </p>
                      </div>
                    </div>
                  ))
                }
              </div>
              <div className='w-[60%] border border-richblack-5 px-16 py-7 rounded-xl'>

                <div>
                  <h1 className='text-4xl font-bold'>
                    Got a Idea? We've got the skills. Let's team up
                  </h1>
                  <p className='text-richblack-500 mt-2'>
                    Tell us more about yourself and what you're got in mind.
                  </p>
                </div>

                <div className='mt-5'>
                  <ContactForm></ContactForm>
                </div>
              </div>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default Contact