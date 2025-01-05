import React, { useEffect, useState } from 'react'
import Slider from '../components/common/Slider'
import FrequentlyBoughtCourseCart from '../components/common/FrequentlyBoughtCourseCart'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getClickedCatagoty } from '../services/operations/courseOperation';
import Loader from './Loader';

function CatagotyPage() {
  const {clickedCatagoryData}=useSelector((state)=>state.course)
  const {loader}=useSelector((state)=>state.auth);
  const catagoryTypes=["Most popular","New","Trending"]

  const [clickedCatagoryType, setClickedCatagoryType] = useState(0);


  const { catagoryName } = useParams(); 


  const dispatch=useDispatch();

  useEffect(()=>{
    console.log("catagoryName=>",catagoryName)
    dispatch(getClickedCatagoty(catagoryName.replace('-','/')))
  },[catagoryName])

  function handelShowCatagory(index){
    setClickedCatagoryType(index);
  }

  return (
    <div>
      {
        loader?
        (
          <Loader></Loader>
        )
        :
        (
          <div className='text-white pt-16 mx-auto'>

            {/* section 1 */}
            <div className='bg-richblack-700'>
              <div className='mx-auto w-[90%] flex'>
                <div className=' w-[80%] py-9'>
                  <div className='flex gap-x-1'>
                    <p>Home /</p>
                    <p>Catalog /</p>
                    <p className='text-yellow-50'>{catagoryName}</p>
                  </div>
                  <div className='mt-8 text-3xl font-thin'>
                    <h1>{catagoryName.toUpperCase()}</h1>
                  </div>
                  <div className='mt-2'>
                    <p className='text-richblack-200 w-[90%]'>
                      {clickedCatagoryData?.descp}
                    </p>
                  </div>
                </div>
                <div className='py-5'>
                  <div>
                    <h1 className='font-thin text-lg mb-2'>
                      Related resources
                    </h1>
                  </div>
                  <div className='ml-7'>
                    <ul className='list-disc space-y-1'>
                      <li>Doc {catagoryName}</li>
                      <li>Cheatsheet</li>
                      <li>Articles</li>
                      <li>Community Forums</li>
                      <li>Projects</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>



            {/* section 2 */}
            <div className='w-[90%] mx-auto mt-16'>
              <div className='mb-4'>
                <h1 className='text-3xl'>Courses to get you started</h1>
              </div>
              <div>
                <div className='flex gap-x-3 w-[97%] mx-auto font-thin'>
                  {
                    catagoryTypes.map((ele,index)=>(
                      <div key={index} onClick={()=>handelShowCatagory(index)}>
                        <p className={`${clickedCatagoryType===index?"text-yellow-25":"text-richblack-50"} hover:cursor-pointer`}>{ele}</p>
                      </div>
                    ))
                  }
                </div>

                <div className='mb-4  text-richblack-200'>
                  <hr />
                </div>

                <div >
                  <Slider catagoryName={catagoryName}/>
                </div>

              </div>

              <div>
                <div className=''>
                  <h1>Top Courses on {catagoryName}</h1>
                </div>
                  {/* ---------------------------------for Test Only----------------------------------------------  */}
                <div>
                  <Slider catagoryName={catagoryName}/>
                </div>
              </div>


                  {/* check afterwards */}
              {/* <div>
                <div>
                  <h1>Frequently Bought Together</h1>
                </div>
                <div>
                  <FrequentlyBoughtCourseCart/>
                </div>
              </div> */}


            </div>
          </div>
        )
      }
    </div>
  )
}

export default CatagotyPage