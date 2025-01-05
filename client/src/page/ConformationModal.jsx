import React from 'react'
import YellowBlackBtn from '../components/HomePage/YellowBlackBtn'
import { useDispatch, useSelector } from 'react-redux'
import { setConfirmationDeleteModalStatus } from '../features/profile/profileSlice'
import { RxCross2 } from 'react-icons/rx'
import { deleteSection, deleteSubSection } from '../services/operations/sectionOperations'
import Loader from './Loader'

function ConformationModal() {

  const { confirmDeleteModalState ,clickedSectionID,clickedCourseID,clickedSubSectionID ,toDelete} = useSelector((state) => state.profile);
  const {loader}=useSelector((state)=>state.auth);

  const dispatch=useDispatch();

  function onClickOk(){
    if(toDelete==='Section'){
      console.log("Deleting Section")
      dispatch(deleteSection(clickedSectionID,clickedCourseID))
    }
    if(toDelete==='Subsection'){
      console.log("Deleting Sub-Section")
      dispatch(deleteSubSection(clickedCourseID,clickedSectionID,clickedSubSectionID))
    }
    dispatch(setConfirmationDeleteModalStatus(!confirmDeleteModalState))
    
  }

  function onClickGoBack(){
    console.log("Canceling Delete")
    dispatch(setConfirmationDeleteModalStatus(!confirmDeleteModalState))
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
          <div>
            <div className='fixed bottom-1 inset-0 bg-opacity-90 flex justify-center items-center z-50 overflow-hidden backdrop-blur-sm'>
              <div className='text-white bg-richblack-800 px-7 pt-7 rounded-md'>
                <div >
                  <div className='flex justify-between items-center'>
                    <div className='w-[80%]'>
                      <h1 className='text-md font-bold'>Delete this Section??</h1>
                    </div>
                    <div onClick={()=>dispatch(setConfirmationDeleteModalStatus(!confirmDeleteModalState))} className='hover:cursor-pointer'><RxCross2 size={20} /></div>
                  </div>
                  <hr className='my-7 w-[80%] mx-auto' />

                  <div>
                  <div className='flex justify-end gap-x-7'>
                    <div onClick={onClickGoBack}>
                      <YellowBlackBtn colour={"Black"}>Go Back</YellowBlackBtn>
                    </div>

                    <div onClick={onClickOk}>
                      <YellowBlackBtn  colour={"Yellow"}>Yes</YellowBlackBtn>
                    </div>
                  </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default ConformationModal