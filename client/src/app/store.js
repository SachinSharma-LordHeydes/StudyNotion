import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import profileReducer from "../features/profile/profileSlice";
import  courseReducer  from "../features/Courses/coursesSlice";
import sectionReducer from "../features/Courses/sectionSlice";


export const store=configureStore({
  reducer:{
    auth:authReducer,
    profile:profileReducer,
    course:courseReducer,
    section:sectionReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: true })
})

export default store;