import React from 'react'

function HighligthText({text,colour}) {
  return (
    <span className={`font-bold text-transparent bg-clip-text ${colour?`${colour}`:"bg-gradient-to-b from-richblack-300 to-[#2ADFF3]"}`}>
      {text}
    </span>
  )
}

export default HighligthText