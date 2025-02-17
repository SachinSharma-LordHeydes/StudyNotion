import React from 'react'
import YellowBlackBtn from './YellowBlackBtn'
import { FaArrowRight } from 'react-icons/fa6'
import { TypeAnimation } from 'react-type-animation';
import { useNavigate } from 'react-router';

function CodeBlocks({heading,subheading,btn1,btn2,sequence,placing,gradient}) {

  const navigate=useNavigate()

  const handelSignupNavigateion=()=>{
    if(localStorage.getItem("userData")){
      console.log("true")
      navigate(`/catalog/DSA`)
    }else{
      console.log("false")
      navigate("/Signup")
    }
  }

  return (
    <div className={`flex ${placing} justify-center items-center text-md font-extralight gap-52`}>
      {/* textSection */}
      <div className='w-[60%]'>
          <p className='text-4xl font-bold text-white '>
            {heading}
          </p>

          <p className='mt-5 text-richblack-100 font-bold text-md'>
            {subheading}
          </p>

          <div className='mt-12 flex'>
            <div onClick={handelSignupNavigateion}>
                <YellowBlackBtn colour={`${btn1.colour}`} arrow={`${<FaArrowRight className='ml-2' />}`} >
                    {btn1.text} <FaArrowRight></FaArrowRight>
                </YellowBlackBtn>
            </div>

            <div onClick={()=>{navigate('/about')}}>
                <YellowBlackBtn colour={`${btn2.colour}`} >{btn2.text}</YellowBlackBtn>
            </div>
           
          </div>

      </div>

      {/* codeBlock Section */}
      <div className={`w-[40%] flex gap-5 border-[3px] border-richblack-700 p-2 ${gradient}`}>

        <div className='w-[5%] text-white items-center text-center'>
            <p>1</p>
            <p>2</p>
            <p>3</p>
            <p>4</p>
            <p>5</p>
            <p>6</p>
            <p>7</p>
            <p>8</p>
            <p>9</p>
            <p>10</p>
            <p>11</p>
            <p>12</p>
        </div>
        <div className='min-w-80'>
          <TypeAnimation className='text-white'
            wrapper="span"
            sequence={[sequence,1000,""]}
            speed={50}
            style={{ whiteSpace: 'pre-line'}}
            repeat={Infinity}
            omitDeletionAnimation="true"
        />
        </div>

      </div>

    </div>
  )
}

export default CodeBlocks