import React, { useEffect, useState } from 'react';
import { FaArrowRight } from "react-icons/fa6";
import HighligthText from '../components/HomePage/HighligthText';
import YellowBlackBtn from '../components/HomePage/YellowBlackBtn';
import Banner from '../assets/Images/banner.mp4'
import CodeBlocks from '../components/HomePage/CodeBlocks';
import TimeLine from '../components/HomePage/TimeLine';
import logo1 from '../assets/TimeLineLogo/Logo1.svg'
import logo2 from '../assets/TimeLineLogo/Logo2.svg'
import logo3 from '../assets/TimeLineLogo/Logo3.svg'
import logo4 from '../assets/TimeLineLogo/Logo4.svg'
import TimeLineImage from '../assets/Images/TimelineImage.png'
import knowYourProgress from "../assets/Images/Know_your_progress.png"
import compareWithOthers from "../assets/Images/Compare_with_others.png"
import planYourLessons from '../assets/Images/Plan_your_lessons.png'
import instructor from '../assets/Images/Instructor.png'
// import { showStats } from '../features/exploreNavSlice';
import ExploreNavbar from '../components/HomePage/ExploreNavbar';
import ExploreCards from '../components/HomePage/ExploreCards';
import { HomePageExplore } from '../data/homepage-explore';
import toast, { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import Loader from './Loader';


function Home() {
  
  const {loader}=useSelector((state)=>state.auth);
  
  const tags=HomePageExplore.map((element)=>element.tag);
  const courses=HomePageExplore.map((element)=>element.courses);
  const currentCourseIndx=0;

  const[currentTag,setCurrentTag]=useState(tags[0]);
  const[currentCourse,setCurrentCourse]=useState(courses[0]);
  const[currentCard,setCurrentCard]=useState(currentCourseIndx);
  

  function clickHandlerForTags(event) {
    setCurrentTag(event.target.innerText);
    const index = tags.indexOf(event.target.innerText);
    if (index !== -1) {
        setCurrentCourse(courses[index]);
    }
  }

  useEffect(()=>{
    console.log("Loader----------->",loader)
  },[loader])

  function clickHandlerForCard(id){
    // console.log("Event => ",event.target.id);
    setCurrentCard(id);
  }

  return (
    <div>
        {/* <Navbar></Navbar> */}


        {
          loader?
          (
            <div className='items-center flex justify-center my-auto'>
              <Loader></Loader>
            </div>
          )
          :
          (
            <div className='mx-auto w-11/12 pt-9 flex flex-col justify-center items-center '>

              
              
                {/* section 1 */}
                
        {/* ------------------------------------------- */}
              <div className=' mx-auto flex-col flex justify-center items-center  mb-20 '>
              {/* <div>
              <Link to={"/Login"}> 
                <YellowBlackBtn colour={'Yellow'}>Login</YellowBlackBtn>
              </Link>
              <Link to={"/Signup"}> 
                <YellowBlackBtn colour={'Black'}>Sign up</YellowBlackBtn>
              </Link>
              </div> */}
                <div className=''>

                  <button 
                    className="bg-richblack-700 text-richblack-300 hover:bg-richblack-800  font-medium rounded-full text-lg px-14 py-1.5 text-center inline-flex items-center mt-16 shadow-richblack-400 shadow-sm hover:shadow-none hover:scale-95 duration-300 transition-all"
                  >
                    Become an Instructor 
                    <FaArrowRight className='ml-2' />
                  </button>
                </div>

                  <div className='text-white mt-9'>
                    <p className='text-4xl font-bold '>
                      Empower Your Future with <HighligthText text={"Coding Skills"}></HighligthText>
                    </p>
                  </div>

                  <div className='flex justify-center'>
                    <p className='mt-9 w-10/12 text-center text-richblack-100 text-lg font-bold'>
                    With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
                    </p>
                  </div>

                  <div className='mt-32 flex'>
                    <YellowBlackBtn colour={'Yellow'}>Learn More</YellowBlackBtn>
                    <YellowBlackBtn colour={'Black'}>Book a Demo</YellowBlackBtn>
                  </div>

                  <div className='mt-32 shadow-[0px_-15px_100px_rgba(8,_112,_184,_0.7)] ]'>
                    <video 
                    muted
                    loop
                    autoPlay
                    src={Banner}
                    >
                    </video>
                  </div>

                    {/* codeSection 1 */}


                    <div className='mt-40'>
                      <CodeBlocks
                        heading={
                          <div>
                            Unlock your { <HighligthText text={"coding potential "}/>} with our online courses.
                          </div>
                        }
                        subheading={'Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you.'}
                        btn1={
                          {
                            text:`Try it Yourself`,
                            colour:"Yellow"
                          }
                        }
                        btn2={
                          {
                            text:"Learn More",
                            colour:"Black"
                          }
                        }
                        sequence={
                          `<!DOCTYPE html>\n<html lang="en">\n<head>\n <title>Document</title>\n</head>\n<body>\n<h1>Welcome To StudyNotion</h1>\n<p>\nUnlock your Potential with us\n</p>\n</body>\n</html>`
                        
                        }
                        placing={'flex-row'}
                        gradient={'shadow-[0px_5px_70px_rgba(8,_112,_184,_0.7)] ]'}
                      />
                    </div>


                    <div className='mt-40'>
                      <CodeBlocks
                        heading={
                          <div>
                            Start { <HighligthText text={"coding in seconds"}/>} .
                          </div>
                        }
                        subheading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."}
                        btn1={
                          {
                            text:`Continue Lesson`,
                            colour:"Yellow"
                          }
                        }
                        btn2={
                          {
                            text:"Learn More",
                            colour:"Black"
                          }
                        }
                        sequence={
                          `import { Route } from 'react-router-dom';\nimport './App.css';\nimport Home from './page/Home';\n\nfunction App() {\nreturn (\n<div className='bg-black-900 font-inter'>\n<div><Home/></div>\n </div>\n);\n}\nexport default App;`
                        
                        }
                        placing={'flex-row-reverse '}
                        gradient={'shadow-[0px_20px_100px_rgba(8,_112,_184,_0.7)] ]'}
                      />

                      <div className='text-center mt-40'>
                        <p className='text-4xl text-white'>Unlock the<HighligthText text={' Power of Code'}></HighligthText></p>
                        <p className='mt-3 text-richblack-100 text-md'>Learn to Build Anything You Can Imagine</p>
                      </div>

                    </div>

                    

                  {/* codeSection 2 */}

                


              </div>

                  
              <div className='w-11/12 mb-16 relative'>
                <div onClick={clickHandlerForTags} className='flex py-1 w-[65%] mx-auto text-center items-center justify-center bg-richblack-800 rounded-full'>
                  {
                    tags.map((tag,index)=>(
                      <ExploreNavbar key={index} currentTag={currentTag} tag={tag}></ExploreNavbar>
                    ))
                  }
                </div>
                {/* card section */}
                <div   className=' flex items-center mt-20 justify-between absolute'>
                  {
                    currentCourse.map((course,index)=>(
                      <ExploreCards 
                        key={index} 
                        id={index} 
                        onClick={()=>clickHandlerForCard(index)}
                        clickHandlerForCard={clickHandlerForCard} 
                        currentCard={currentCard} 
                        course={course}>
                      </ExploreCards>
                      )
                    )
                  }
                </div>
              </div>
                
                  {/* section 2 */}
        {/* ------------------------------------------- */}
              <div className='bg-pure-greys-5 text-richblack-700 mt-48'>
                <div className='flex flex-col justify-end section2bg h-[320px] w-screen p-5 mx-auto '>
                  <div className='  text-xl mx-auto w-11/12'>
                
                      <div className='flex justify-center items-center text-md font-extrabold mb-11'>
                        <YellowBlackBtn colour={'Yellow'}>Explore Full Catalog <FaArrowRight></FaArrowRight></YellowBlackBtn>
                        <YellowBlackBtn YellowBlackBtn colour={'Black'}>Learn More</YellowBlackBtn>
                      </div>

                  </div>
                </div>

                <div className='w-11/12 mx-auto items-center'>
                  <div className='flex justify-between mt-20 gap-32'>
                    <div className='w-[80%]'>
                      <p className='text-5xl '>
                        Get the skills you need for a <HighligthText text={' job that is in demand.'}></HighligthText>
                      </p>
                    </div>
                    <div>
                      <div>
                        <p className='text-md'>
                        The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                        </p>
                      </div>
                      <div className='text-sm'>
                        <YellowBlackBtn colour={'Yellow'}>Learn More</YellowBlackBtn>
                      </div>
                    </div>
                  </div>

                  <div className='flex justify-between items-center mt-20'>
                    <div>
                      <TimeLine
                        logo={logo1} 
                        title={'Leadership'} 
                        subtitle={'Fully committed to the success company'}
                      />

                      <TimeLine
                        logo={logo2} 
                        title={'Responsibility'} 
                        subtitle={'Students will always be our top priority'}
                      />

                      <TimeLine
                        logo={logo3} 
                        title={'Flexibility'} 
                        subtitle={'The ability to switch is an important skills'}
                      />

                      <TimeLine
                        logo={logo4} 
                        title={'Solve the problem'} 
                        subtitle={'Code your way to a solution'}
                      />

                    </div>
                    
                    <div className=' shadow-[0px_-15px_100px_rgba(8,_112,_184,_0.7)] ]'>
                      <img src={TimeLineImage} alt="" />
                    </div>
                  </div>

                  <div className='flex flex-col items-center text-center justify-center mt-44'>
                    <p className='text-4xl'>
                      Your swiss knife for <HighligthText text={'learning any language'}></HighligthText>
                    </p>
                    <p className='mt-5 text-md w-[65%]  font-bold'>
                      Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
                    </p>
                  </div>

                  <div className="relative mx-auto flex justify-around mt-24">
                    <div className="absolute left-16">
                      <img src={knowYourProgress} alt="" />
                    </div>
                    <div className="absolute left-96 -top-10">
                      <img src={compareWithOthers} alt="" />
                    </div>
                    <div className="relative left-[350px] -top-9 ">
                        <img className='' src={planYourLessons} alt="" />  
                    </div>
                  </div>

                  <div className='flex justify-center mb-20'> 
                    <YellowBlackBtn colour={"Yellow"}>Learn More</YellowBlackBtn>
                  </div>



                </div>
                  
              </div>
                  
                  
                  
                  {/* section 3 */}
        {/* ------------------------------------------- */}
              <div className='mt-24'>
                <div className='bg-richblack-800 bg-transparent text-white'>

                  <div className='flex gap-24'>
                    <div className='mb-20'>
                      <img src={instructor} alt="" />
                    </div>
                    <div>
                      <div>
                        <p className='text-4xl'>
                          Become an <HighligthText text={"instructor"}></HighligthText>
                        </p>
                        <p className='text-richblack-400 mt-9 '>
                          Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
                        </p>
                      </div>
                      <div className='mt-9'>
                        <YellowBlackBtn colour={'Yellow'}>Start Teaching Today <FaArrowRight></FaArrowRight></YellowBlackBtn>
                      </div>


                  </div>
                  </div>
                    <div className='text-center mb-20'>
                      <p className='text-4xl font-bold'>
                      Reviews from other learners
                      </p>
                    </div>

                </div>
              </div>
        {/* ------------------------------------------- */}
            </div>
          )
        }
      <div className='mx-auto w-11/12 pt-9 flex flex-col justify-center items-center '>

        
        
          {/* section 1 */}
          
  {/* ------------------------------------------- */}
        <div className=' mx-auto flex-col flex justify-center items-center  mb-20 '>
        {/* <div>
        <Link to={"/Login"}> 
          <YellowBlackBtn colour={'Yellow'}>Login</YellowBlackBtn>
        </Link>
        <Link to={"/Signup"}> 
          <YellowBlackBtn colour={'Black'}>Sign up</YellowBlackBtn>
        </Link>
        </div> */}
          <div className=''>

            <button 
              className="bg-richblack-700 text-richblack-300 hover:bg-richblack-800  font-medium rounded-full text-lg px-14 py-1.5 text-center inline-flex items-center mt-16 shadow-richblack-400 shadow-sm hover:shadow-none hover:scale-95 duration-300 transition-all"
            >
              Become an Instructor 
              <FaArrowRight className='ml-2' />
            </button>
          </div>

            <div className='text-white mt-9'>
              <p className='text-4xl font-bold '>
                Empower Your Future with <HighligthText text={"Coding Skills"}></HighligthText>
              </p>
            </div>

            <div className='flex justify-center'>
              <p className='mt-9 w-10/12 text-center text-richblack-100 text-lg font-bold'>
              With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
              </p>
            </div>

            <div className='mt-32 flex'>
              <YellowBlackBtn colour={'Yellow'}>Learn More</YellowBlackBtn>
              <YellowBlackBtn colour={'Black'}>Book a Demo</YellowBlackBtn>
            </div>

            <div className='mt-32 shadow-[0px_-15px_100px_rgba(8,_112,_184,_0.7)] ]'>
              <video 
              muted
              loop
              autoPlay
              src={Banner}
              >
              </video>
            </div>

              {/* codeSection 1 */}


              <div className='mt-40'>
                <CodeBlocks
                  heading={
                    <div>
                      Unlock your { <HighligthText text={"coding potential "}/>} with our online courses.
                    </div>
                  }
                  subheading={'Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you.'}
                  btn1={
                    {
                      text:`Try it Yourself`,
                      colour:"Yellow"
                    }
                  }
                  btn2={
                    {
                      text:"Learn More",
                      colour:"Black"
                    }
                  }
                  sequence={
                    `<!DOCTYPE html>\n<html lang="en">\n<head>\n <title>Document</title>\n</head>\n<body>\n<h1>Welcome To StudyNotion</h1>\n<p>\nUnlock your Potential with us\n</p>\n</body>\n</html>`
                  
                  }
                  placing={'flex-row'}
                  gradient={'shadow-[0px_5px_70px_rgba(8,_112,_184,_0.7)] ]'}
                />
              </div>


              <div className='mt-40'>
                <CodeBlocks
                  heading={
                    <div>
                      Start { <HighligthText text={"coding in seconds"}/>} .
                    </div>
                  }
                  subheading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."}
                  btn1={
                    {
                      text:`Continue Lesson`,
                      colour:"Yellow"
                    }
                  }
                  btn2={
                    {
                      text:"Learn More",
                      colour:"Black"
                    }
                  }
                  sequence={
                    `import { Route } from 'react-router-dom';\nimport './App.css';\nimport Home from './page/Home';\n\nfunction App() {\nreturn (\n<div className='bg-black-900 font-inter'>\n<div><Home/></div>\n </div>\n);\n}\nexport default App;`
                  
                  }
                  placing={'flex-row-reverse '}
                  gradient={'shadow-[0px_20px_100px_rgba(8,_112,_184,_0.7)] ]'}
                />

                <div className='text-center mt-40'>
                  <p className='text-4xl text-white'>Unlock the<HighligthText text={' Power of Code'}></HighligthText></p>
                  <p className='mt-3 text-richblack-100 text-md'>Learn to Build Anything You Can Imagine</p>
                </div>

              </div>

              

            {/* codeSection 2 */}

          


        </div>

            
        <div className='w-11/12 mb-16 relative'>
          <div onClick={clickHandlerForTags} className='flex py-1 w-[65%] mx-auto text-center items-center justify-center bg-richblack-800 rounded-full'>
            {
              tags.map((tag,index)=>(
                <ExploreNavbar key={index} currentTag={currentTag} tag={tag}></ExploreNavbar>
              ))
            }
          </div>
          {/* card section */}
          <div   className=' flex items-center mt-20 justify-between absolute'>
            {
              currentCourse.map((course,index)=>(
                <ExploreCards 
                  key={index} 
                  id={index} 
                  onClick={()=>clickHandlerForCard(index)}
                  clickHandlerForCard={clickHandlerForCard} 
                  currentCard={currentCard} 
                  course={course}>
                </ExploreCards>
                )
              )
            }
          </div>
        </div>
          
            {/* section 2 */}
  {/* ------------------------------------------- */}
        <div className='bg-pure-greys-5 text-richblack-700 mt-48'>
          <div className='flex flex-col justify-end section2bg h-[320px] w-screen p-5 mx-auto '>
            <div className='  text-xl mx-auto w-11/12'>
          
                <div className='flex justify-center items-center text-md font-extrabold mb-11'>
                  <YellowBlackBtn colour={'Yellow'}>Explore Full Catalog <FaArrowRight></FaArrowRight></YellowBlackBtn>
                  <YellowBlackBtn YellowBlackBtn colour={'Black'}>Learn More</YellowBlackBtn>
                </div>

            </div>
          </div>

          <div className='w-11/12 mx-auto items-center'>
            <div className='flex justify-between mt-20 gap-32'>
              <div className='w-[80%]'>
                <p className='text-5xl '>
                  Get the skills you need for a <HighligthText text={' job that is in demand.'}></HighligthText>
                </p>
              </div>
              <div>
                <div>
                  <p className='text-md'>
                  The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                  </p>
                </div>
                <div className='text-sm'>
                  <YellowBlackBtn colour={'Yellow'}>Learn More</YellowBlackBtn>
                </div>
              </div>
            </div>

            <div className='flex justify-between items-center mt-20'>
              <div>
                <TimeLine
                  logo={logo1} 
                  title={'Leadership'} 
                  subtitle={'Fully committed to the success company'}
                />

                <TimeLine
                  logo={logo2} 
                  title={'Responsibility'} 
                  subtitle={'Students will always be our top priority'}
                />

                <TimeLine
                  logo={logo3} 
                  title={'Flexibility'} 
                  subtitle={'The ability to switch is an important skills'}
                />

                <TimeLine
                  logo={logo4} 
                  title={'Solve the problem'} 
                  subtitle={'Code your way to a solution'}
                />

              </div>
              
              <div className=' shadow-[0px_-15px_100px_rgba(8,_112,_184,_0.7)] ]'>
                <img src={TimeLineImage} alt="" />
              </div>
            </div>

            <div className='flex flex-col items-center text-center justify-center mt-44'>
              <p className='text-4xl'>
                Your swiss knife for <HighligthText text={'learning any language'}></HighligthText>
              </p>
              <p className='mt-5 text-md w-[65%]  font-bold'>
                Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
              </p>
            </div>

            <div className="relative mx-auto flex justify-around mt-24">
              <div className="absolute left-16">
                <img src={knowYourProgress} alt="" />
              </div>
              <div className="absolute left-96 -top-10">
                <img src={compareWithOthers} alt="" />
              </div>
              <div className="relative left-[350px] -top-9 ">
                  <img className='' src={planYourLessons} alt="" />  
              </div>
            </div>

            <div className='flex justify-center mb-20'> 
              <YellowBlackBtn colour={"Yellow"}>Learn More</YellowBlackBtn>
            </div>



          </div>
            
        </div>
            
            
            
            {/* section 3 */}
  {/* ------------------------------------------- */}
        <div className='mt-24'>
          <div className='bg-richblack-800 bg-transparent text-white'>

            <div className='flex gap-24'>
              <div className='mb-20'>
                <img src={instructor} alt="" />
              </div>
              <div>
                <div>
                  <p className='text-4xl'>
                    Become an <HighligthText text={"instructor"}></HighligthText>
                  </p>
                  <p className='text-richblack-400 mt-9 '>
                    Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
                  </p>
                </div>
                <div className='mt-9'>
                  <YellowBlackBtn colour={'Yellow'}>Start Teaching Today <FaArrowRight></FaArrowRight></YellowBlackBtn>
                </div>


            </div>
            </div>
              <div className='text-center mb-20'>
                <p className='text-4xl font-bold'>
                Reviews from other learners
                </p>
              </div>

          </div>
        </div>
  {/* ------------------------------------------- */}
      </div>
    </div>
  )
}

export default Home












