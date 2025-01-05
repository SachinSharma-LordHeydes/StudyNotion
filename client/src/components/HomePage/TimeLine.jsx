import React from 'react'

function TimeLine({logo,title,subtitle}) {
  return (
    <div className='flex gap-10 items-center mb-14'>
      <div className='bg-white rounded-full p-4 flex justify-center items-center'>
        <img className='size-7' src={logo} alt="" />
      </div>
      <div>
        <div className='font-bold text-xl'>
          {title}
        </div>
        <div className='text-md'>
          {subtitle}
        </div>
      </div>
    </div>
  )
}

export default TimeLine