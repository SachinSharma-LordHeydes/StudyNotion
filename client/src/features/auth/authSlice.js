import { createSlice } from "@reduxjs/toolkit";
import { createUserData } from './userDataStructure';

const initialState = {
  signupData: null,
  loading: false,
  loader:false,
  otpSent: null,
  status: null,
  userData: localStorage.getItem('userData')? JSON.parse(localStorage.getItem('userData')) : null
};


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSignupData(state, action) {
      state.signupData = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setLoader(state, action) {
      state.loader = action.payload;
    },
    setOtp(state, action) {
      state.otpSent = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    setData(state, action) {
      state.token = action.payload.token;
      state.userData = action.payload;
      localStorage.setItem("userData", JSON.stringify(state.userData));
    },
    removeData(state) {
      localStorage.removeItem("userData");
      localStorage.removeItem("profileInfo");
      state.userData=null
    }
  },
});

export const { setSignupData, setLoading,setLoader, setOtp, setStatus, setData, removeData } = authSlice.actions;
export default authSlice.reducer;