import { createSlice} from "@reduxjs/toolkit";


const initialState={
  catagory:[],
  thumbnailPreview: null,
  courseDetails: null,
  instructorAllCourses:null,
  clickedCatagoryData:null,
  showClickedCourseStatus:false,
  cartDetail:null,
  lectureData:null
}

export const courseSlice=createSlice({
  name:'course',
  initialState,
  reducers:{
    setCatagory:(state,action)=>{
      state.catagory=action.payload
    },
    setCourseData: (state, action) => {
      state.courseData = { ...state.courseData, ...action.payload };
    },
    setThumbnailPreview: (state, action) => {
      state.thumbnailPreview = action.payload;
    },
    setCourseDetails: (state, action) => {
      state.courseDetails = action.payload;
    },
    setInstructorAllCourse: (state, action) => {
      state.instructorAllCourses = action.payload;
    },
    setClickedCatagoryData: (state, action) => {
      state.clickedCatagoryData = action.payload;
    },
    setCartDetail: (state, action) => {
      state.cartDetail = action.payload;
    },
    showClickedCourseStatus: (state, action) => {
      state.clickedCatagoryData = action.payload;
    },
    setLectureData: (state, action) => {
      state.lectureData = action.payload;
    },
  }
})


export const {setCatagory,setCourseData,setThumbnailPreview,setCourseID,setCourseDetails,setInstructorAllCourse,setClickedCatagoryData,showClickedCourseStatus,setCartDetail,setLectureData} = courseSlice.actions;

export default courseSlice.reducer;