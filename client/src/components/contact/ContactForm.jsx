import React from 'react'
import { useForm } from 'react-hook-form';
import countrycode from '../../data/countrycode.json'
import YellowBlackBtn from '../HomePage/YellowBlackBtn';

function ContactForm() {

    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();

  return (
    <div className='mt-9'>
      <form onSubmit={handleSubmit((data) => console.log(data))}>
        
        <div className='flex flex-row gap-9 mt-4'>
          <div className='w-[50%]'>
           <div>
            <label htmlFor="firstName">First Name</label>
           </div>
            <input className='px-5 py-3 w-full bg-richblack-700 rounded-md shadow shadow-richblack-100' name="firstName" type="text" placeholder='firstName' {...register('firstName',{required:true})} />
            {errors.firstName && <p className='mt-1 text-[#FF0000]'>First name is required.</p>}
          </div>
          <div className='w-[50%]'>
           <div>
            <label htmlFor="lastName">Last Name</label>
           </div>
            <input className='px-5 py-3 w-full bg-richblack-700 rounded-md shadow shadow-richblack-100' name="lastName" type="text" placeholder='lastName' {...register('lastName',{required:true})} />
            {errors.lastName && <p className='mt-1 text-[#FF0000]'>Last name is required.</p>}
          </div>
        </div>

        <div className='mt-4'>
          <div>
            <label htmlFor="email">Email Address</label>
          </div>
          <input className='px-5 py-3 w-full bg-richblack-700 rounded-md shadow shadow-richblack-100' name="email" type="text" placeholder='email' {...register('email',{required:true})} />
          {errors.email && <p className='mt-1 text-[#FF0000]'>Email is required.</p>}
        </div>

        <div className='mt-4 flex justify-between  '>
          <div className='w-[30%]'>
            <div>
              <label htmlFor="phoneNumber">Code</label>
            </div>
            <select className='px-3 py-4 w-[90%]  bg-richblack-700 rounded-md shadow shadow-richblack-100' name="code" id="code">
              {
                countrycode.map((element,index)=>(
                  <option className='text-white' key={index} value={`${element.code}`}>
                    {element.code}-{element.country}
                  </option>
                ))
              }
            </select>

          </div>

          <div className='w-[80%]'>
            <div>
              <label htmlFor="phoneNumber">Phone Number</label>
            </div>
            <input className='px-5 py-3 w-full bg-richblack-700 rounded-md shadow shadow-richblack-100' name="phoneNumber" type="phoneNumber" placeholder='12456789' {...register('phoneNumber',{required:true})} />
            {errors.phoneNumber && <p className='mt-1 text-[#FF0000]'>Phone Number is required.</p>}
          </div>
          
        </div>

        <div className='mt-4'>
          <div>
            <label htmlFor="message">Message</label>
          </div>
          <div>
            <textarea className='bg-richblack-700 rounded-md px-5 py-2 w-full' rows={7} placeholder='Enter your messsage here....' name="message" id="message" {...register('message',{required:true})}></textarea>
          </div>
          {errors.message && <div className='mt-1 text-[#FF0000]'>Please enter something.</div>}
        </div>
        <div className='w-full'>
          <YellowBlackBtn width='full' colour={'Yellow'}>Send Message</YellowBlackBtn>
        </div>
      </form>
    </div>
  )
}

export default ContactForm