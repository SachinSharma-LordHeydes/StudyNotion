import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RiDeleteBin6Line } from "react-icons/ri";
import { buyCourse, removeFromCart } from '../services/operations/courseOperation';
import YellowBlackBtn from '../components/HomePage/YellowBlackBtn';
import { getUserDetails } from '../services/operations/authOperation';
import Loader from './Loader';


function Cart() {
  const {userData,loader}=useSelector((state)=>(state.auth));
  const [totalPrice,setTotalPrice]=useState(0);

  const dispatch=useDispatch();

  let cart=userData.cart

  useEffect(()=>{
    dispatch(getUserDetails(userData._id))
    console.log("Cart userData-----------//---------->",userData)
    console.log("Cart userData-----------//---------->",cart)
  },[])


  const handelRemove=(courseID)=>{
    console.log("remove Clicked---------------->",userData,courseID);
    
      if (courseID && userData && userData.token) {
        dispatch(removeFromCart(courseID, userData.token));
        console.log("cart removed------------>",userData)
      } else {
        console.error("Required details for removing to cart are missing.");
      }
  }

  const handelChange =(e,amount)=>{
    console.log("event----------->",amount)
    if(e.target.checked){
      let calculated=totalPrice+parseInt(amount)
      setTotalPrice(calculated)
    }else{
      let calculated=totalPrice-parseInt(amount)
      setTotalPrice(calculated)
    }
  }

  const handelBuy=()=>{
    console.log("clicked buy COurse------------>",userData.cart._id,totalPrice)
    dispatch(buyCourse('671a2e3c79e90efd016e783a',totalPrice))
  }

  return (
    <div>
      {
        loader?
        (
          <div className='items-center flex justify-center my-auto'>
            <Loader />
          </div>
        )
        :
        (
          <div>
            <div>
              <h1 className='text-3xl font-bold my-5'>Cart</h1>
            </div>
            <div>
              <p className='text-richblack-300'>{userData?.cart?.length} Courses in cart</p>
            </div>
            <hr className='mt-3 text-richblack-400' />
            
            {
              userData?.cart?.length===0?
              (
                <div className='text-3xl text-richblack-400 font-bold flex justify-center items-center mt-16'> 
                  <p>Your Cart is empty</p>
                </div>
              )
              :
              (
                <div className='flex justify-between mt-5 px-9'>
                  <div className='w-[70%]'>
                    {
                      userData?.cart.map((ele,index)=>(
                        <div className='' key={index}>
                          <div className='flex justify-between my-9 items-center px-3'>
                            <div className='flex space-x-3'>
                              <div className=''>
                                <img height={250} width={250} className='rounded-md' src={ele?.thumbnail} alt="" />
                              </div>
                              <div>
                                <div className='text-xl'>{ele?.courseDescp}</div>
                                <div className='text-richblack-600'>{ele?.catagoryName}</div>
                                <div>(RATING)</div>
                              </div>
                            </div>
                            <div className='items-center '>
                              <div className='text-end pr-9 mb-9'>
                                <input onChange={(e)=>handelChange(e,ele?.price)} className='w-7 h-7' defaultValue={false} type="checkbox" />
                              </div>
                              <div className='text-[#EF476F] bg-richblack-700 px-3 py-2 rounded-md flex space-x-3 items-center'>
                                <div><RiDeleteBin6Line /></div>
                                <div onClick={()=>handelRemove(ele._id)} className='text-xl hover:cursor-pointer'>Remove</div>
                              </div>
                              <div className='text-2xl px-3 py-2 text-yellow-50 font-bold'>रू {ele?.price}</div>
                            </div>
                          </div>
                          <hr className=' text-richblack-400' />
                        </div>
                      ))
                    }
                  </div>
                  <div className='w-[27%] items-center text-center bg-richblack-700 h-fit px-5 py-9 rounded-lg space-y-3'>
                    <div className='text-richblack-200 text-sm text-start '>TOTAL :</div>
                    <div className='text-start ml-9'>
                      {
                        totalPrice<=0?
                        (
                          <div className='text-sm text-richblack-200'>
                            Please click the check box to select
                          </div>
                        ):
                        (
                          <div className='text-yellow-50 font-bold text-2xl'>
                            रू {totalPrice}
                          </div>
                        )
                      }
                    </div>
                    <div onClick={handelBuy}>
                      <YellowBlackBtn colour={"Yellow"}>Buy Now</YellowBlackBtn>
                    </div>
                  </div>

                </div>
              )
            }
          </div>
        )
      }
    </div>
  )
}

export default Cart