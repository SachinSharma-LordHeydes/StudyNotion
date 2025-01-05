import React from 'react'

function ExploreCards({course,id,currentCard,clickHandlerForCard}) {
  return (
    <div 
      id={id} 
      onClick={()=>clickHandlerForCard(id)}
      className={` ${currentCard===id?('bg-white w-[30%]  h-80 px-5 py-3 flex flex-col justify-between shadow-[10px_10px_0px_1px_#d69e2e]'):('w-[30%] bg-richblack-800 h-80 px-5 py-3 flex flex-col justify-between')}`}>
     <div>
      <div 
        id={id}
        className={`${currentCard===id?('text-black text-2xl font-semibold mb-7'):("text-white text-2xl font-semibold mb-7")}`}>

          <h1>{course.heading}</h1>
        </div>
        <div 
          id={id}
          className={`${currentCard===id?('text-richblack-400 '):("text-richblack-100")}`}>
          <p>{course.description}</p>
      </div>
     </div>
      <div>
        <div></div>
        <div 
          id={id}
          className={`border-t-[3px] border-dashed border-richblack-300 flex justify-between px-3 text-center items-center py-3 ${currentCard===id?('text-caribbeangreen-100'):("text-richblack-100")} `}>
          <div className=''>
            {course.level}
          </div>
          <div className=''>
            {course.lessionNumber} Lession
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExploreCards