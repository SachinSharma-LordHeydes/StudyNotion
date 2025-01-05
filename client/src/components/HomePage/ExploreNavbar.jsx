import React from 'react'

function ExploreNavbar({tag,currentTag}) {

  // const[currentTag,setCurrentTag]=useState('Free');

  // function clickHandler(event){
  //   console.log('Event => ' ,currentTag)
  // }

  return (
    <div 
      // onClick={clickHandler} 
      className={`${currentTag===tag?('px-4 text-lg mx-3 text-richblack-100 py-1 rounded-full bg-richblack-900 hover:bg-richblack-900 hover:rounded-full'):('px-4 text-lg mx-3 text-richblack-100 py-1 rounded-full hover:bg-richblack-900 hover:rounded-full')}`}>
      <button>{tag}</button>
    </div>
  )
}

export default ExploreNavbar