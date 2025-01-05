import { createSlice} from "@reduxjs/toolkit";


const initialState={
  currentStep:1,
  modalState:false,
  changeSectionNameModalState:false,
  confirmDeleteModalState:false,
  toDelete:'',
  editOrNextStatus:1, //Next=>1 edit=>0
  editOrNextStatusOfVideo:1, //Next=>1 edit=>0
  clickedCourseID:null,
  clickedSectionID:null,
  clickedSubSectionID:null,
  success:null,
  profileInfo:localStorage.getItem('profileInfo')? JSON.parse(localStorage.getItem('profileInfo')) : null
}

export const profileSlice=createSlice({
  name:'profile',
  initialState,
  reducers:{
    setCurrentStep:(state,action)=>{
      state.currentStep=action.payload
    },
    setChangeSectionNameModalState:(state,action)=>{
      state.changeSectionNameModalState=action.payload
    },
    setModalState:(state,action)=>{
      state.modalState=action.payload
    },
    setEditOrNextStatus:(state,action)=>{
      state.editOrNextStatus=action.payload
    },
    setEditOrNextStatusOfVideo:(state,action)=>{
      state.editOrNextStatusOfVideo=action.payload
    },
    setClickedCourseID:(state,action)=>{
      state.clickedCourseID=action.payload
    },
    setClickedSectionID:(state,action)=>{
      state.clickedSectionID=action.payload
    },
    setClickedSubSectionID:(state,action)=>{
      state.clickedSubSectionID=action.payload
    },
    setConfirmationDeleteModalStatus:(state,action)=>{
      state.confirmDeleteModalState=action.payload
    },
    setToDelete:(state,action)=>{
      //-----------To Check
      state.toDelete=action.payload
    },
    setSuccess:(state,action)=>{
      state.success=action.payload
    },
    setProfileInfo:(state,action)=>{
      state.profileInfo=action.payload
      localStorage.setItem("profileInfo", JSON.stringify(state.profileInfo));
    }
  }
})


export const {setCurrentStep,setModalState,setChangeSectionNameModalState,setEditOrNextStatus,setClickedSectionID,setClickedCourseID,setClickedSubSectionID,setConfirmationDeleteModalStatus,setToDelete,setEditOrNextStatusOfVideo,setSuccess,setProfileInfo} = profileSlice.actions;

export default profileSlice.reducer;