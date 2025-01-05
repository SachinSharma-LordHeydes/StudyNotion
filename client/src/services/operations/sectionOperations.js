import { apiConnector } from "../apiConnector"
import {courseEndpoints} from '../../services/api'
import { setAllSectionData, setOneSectionData, setSectionData, setSubSectionData } from "../../features/Courses/sectionSlice";
import { setSuccess } from "../../features/profile/profileSlice";
import { setLoader } from "../../features/auth/authSlice";


const {CREATE_SECTION_API,DELETE_SECTION_API,UPDATE_SECTION_API,CREATE_SUBSECTION_API,DELETE_SUBSECTION_API,GET_SUBSECTION_API,UPDATE_SUBSECTION_API,GET_SECTION_API,GET_ALL_SECTION_API}=courseEndpoints



export function editSection(sectionName,id){
  return async(dispatch)=>{
    dispatch(setLoader(true))
    try {
      const response=await apiConnector('POST',UPDATE_SECTION_API,{sectionName,id});
      console.log("Edit Section Response => ",response)
      dispatch(setSectionData(response.data.data))
      if (response.data.success) {
        dispatch(setSuccess(true))
      }else{
        dispatch(setSuccess(false))
      }

      dispatch(setLoader(false))
    } catch (error) {
      dispatch(setLoader(false))
      console.log("Error Occured while Editing Sections => ",error)
    }
  }
}

export function getSection(id){
  return async(dispatch)=>{
    dispatch(setLoader(true))
    try {
      console.log("getSection input ID => ",id)

      const response=await apiConnector('POST',GET_SECTION_API,{id});
      console.log("get ONe Section Response => ",response)
      dispatch(setOneSectionData(response.data.data))
      if (response.data.success) {
        dispatch(setSuccess(true))
      }else{
        dispatch(setSuccess(false))
      }

      dispatch(setLoader(false))
    } catch (error) {
      dispatch(setLoader(false))
      console.log("Error Occured while fetching Sections data => ",error)
    }
  }
}

export function getAllSection(id){
  return async(dispatch)=>{
    dispatch(setLoader(true))
    try {
      console.log("Allsection ID",id)
      const response=await apiConnector('POST',GET_ALL_SECTION_API,{id});
      // console.log("get AllSection Response => ",response.data.data)
      dispatch(setAllSectionData(response.data.data))
      if (response.data.success) {
        dispatch(setSuccess(true))
      }else{
        dispatch(setSuccess(false))
      }
      dispatch(setLoader(false))
    } catch (error) {
      dispatch(setLoader(false))
      console.log("Error Occured while fetching All Sections data => ",error)
    }
  }
}



export function createSection(sectionName,id){
  return async(dispatch)=>{
    try {
      console.log("Section Name,id",sectionName)
      const response=await apiConnector('POST',CREATE_SECTION_API,{sectionName,id});
      console.log("Create Course Response => ",response)
      dispatch(setSectionData(response.data.data))

      if (response.data.success) {
        dispatch(setSuccess(true))
      }else{
        dispatch(setSuccess(false))
      }

    } catch (error) {
      console.log("Error Occured while Creating Sections => ",error)
    }
  }
}

 
export function deleteSection(id,courseId){
  return async(dispatch)=>{
    try {
      const response=await apiConnector('DELETE',DELETE_SECTION_API,{id,courseId});
      console.log("Delete Section Response => ",response)
      dispatch(setSectionData(response.data.data))

      if (response.data.success) {
        dispatch(setSuccess(true))
      }else{
        dispatch(setSuccess(false))
      }


    } catch (error) {
      console.log("Error Occured while Deleting Sections => ",error)
    }
  }
}



//--------------------------------------------

export function createSubSection(formData){
  return async(dispatch)=>{
    dispatch(setLoader(true))
    try {
      console.log("SubSection Form Data=>", Object.fromEntries(formData))
      const response=await apiConnector('POST',CREATE_SUBSECTION_API,formData,{
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      console.log("Create SubSection Response => ",response)
      dispatch(setSectionData(response.data.data))

      if (response.data.success) {
        dispatch(setSuccess(true))
      }else{
        dispatch(setSuccess(false))
      }

      dispatch(setLoader(false))

    } catch (error) {
      dispatch(setLoader(false))
      console.log("Error Occured while Creating SubSections => ",error)
    }
  }
}

export function deleteSubSection(clickedCourseID,clickedSectionID,clickedSubSectionID){
  return async(dispatch)=>{
    dispatch(setLoader(true))
    try {
      const id=clickedSubSectionID
      const courseId=clickedCourseID
      const sectionId=clickedSectionID

      console.log("SubSection Form Data=>",clickedCourseID,clickedSectionID,clickedSubSectionID)
      const response=await apiConnector('POST',DELETE_SUBSECTION_API,{id, courseId, sectionId});
      console.log("Create SubSection Response => ",response)
      dispatch(setSectionData(response.data.data))

      if (response.data.success) {
        dispatch(setSuccess(true))
      }else{
        dispatch(setSuccess(false))
      }

      dispatch(setLoader(false))

    } catch (error) {
      dispatch(setLoader(false))
      console.log("Error Occured while deleting SubSections => ",error)
    }
  }
}


export function updateSubSection(formData){
  return async(dispatch)=>{
    dispatch(setLoader(true))
    try {
      console.log("SubSection Form Data=>", Object.fromEntries(formData))
      const response=await apiConnector('POST',UPDATE_SUBSECTION_API,formData,{
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      console.log("update SubSection Response => ",response)
      dispatch(setSectionData(response.data.data))

      if (response.data.success) {
        dispatch(setSuccess(true))
      }else{
        dispatch(setSuccess(false))
      }

      dispatch(setLoader(false))

    } catch (error) {
      dispatch(setLoader(false))
      console.log("Error Occured while Updating SubSections => ",error)
    }
  }
}

export function getSubSectionData(id){
  return async(dispatch)=>{
    try {
      console.log("SubSection Form Data=>",id)
      const response=await apiConnector('POST',GET_SUBSECTION_API,{id});
      if(!response){
        console.log("Error Occured while Fetching SubSectionsata");
        return;
      }
      console.log("Fetching SubSection Response => ",response)
      dispatch(setSubSectionData(response.data.data))

      if (response.data.success) {
        dispatch(setSuccess(true))
      }else{
        dispatch(setSuccess(false))
      }

    } catch (error) {
      dispatch(setLoader(false))
      console.log("Error Occured while Fetching SubSectionsata => ",error)
    }
  }
}
