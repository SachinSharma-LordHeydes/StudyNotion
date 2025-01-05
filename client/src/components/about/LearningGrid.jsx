import React from 'react'

import YellowBlackBtn from '../HomePage/YellowBlackBtn'
import HighligthText from '../HomePage/HighligthText';




const LearningGridArray = [
  {
    order: -1,
    heading: "World-Class Learning for",
    highlightText: "Anyone, Anywhere",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
    BtnText: "Learn More",
    BtnLink: "/",
  },
  {
    order: 1,
    heading: "Curriculum Based on Industry Needs",
    description:
      "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
  },
  {
    order: 2,
    heading: "Our Learning Methods",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 3,
    heading: "Certification",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 4,
    heading: `Rating "Auto-grading"`,
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 5,
    heading: "Ready to Work",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
];
function LearningGrid() {
  return (
    <div>
      <div className='grid grid-cols-4 grid-rows-2 '>
        {
          LearningGridArray.map((element,index)=>(
            element.order<0?
            (
              <div key={index} className='col-span-2 w-[80%] '>
                <h1 className='text-4xl'>
                  {element.heading}
                </h1>
                <div className='text-4xl'>
                  <HighligthText text={`${element.highlightText}`}></HighligthText>
                </div>
                <p className='text-richblack-400 mt-9'>
                  {element.description}
                </p>
                <YellowBlackBtn colour={'Yellow'}>Learn</YellowBlackBtn>
              </div>
            ):
            (
              <div key={index} className={`px-9 pt-9  ${index === 3 ? 'col-start-2' : ''} ${element.order%2===0?("bg-richblack-800"):("bg-richblack-700")}`}>
                <h1 className='text-xl'>
                  {element.heading}
                </h1>
                <p className='text-richblack-200 mt-12'>
                  {element.description}
                </p>
              </div>
            )
          ))
        }
      </div>
    </div>
  )
}

export default LearningGrid