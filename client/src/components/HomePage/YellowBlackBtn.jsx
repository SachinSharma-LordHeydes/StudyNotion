import React from 'react';


function YellowBlackBtn({children,colour,width}) {
  return (
    <div className='mx-5 font-extrabold hover:cursor-pointer'>
      {
        colour==='Yellow'?(
          <div className=''>
            <div 
              className={`font-semibold px-6 py-3 text-center  justify-center text-black bg-yellow-50 rounded-lg shadow-richblack-600 shadow-md hover:shadow-none hover:scale-90 duration-300 transition-all flex gap-1 items-center w-${width}`}>
            {children}
          </div>
          </div>
        )
        :
        (
          <div>
            <div 
              className={`font-semibold px-6 py-3  text-white bg-richblack-700 rounded-lg text-center shadow-richblack-600 hover:scale-90 duration-300 transition-all shadow-sm hover:shadow-none flex justify-center gap-2 items-center w-${width}`}>
                {children}
            </div>
          </div>
        )
      }
    </div>
  )
}

export default YellowBlackBtn