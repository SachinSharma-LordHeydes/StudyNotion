
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';

// Import your components
import Home from './page/Home';
import Login from './page/Login';
import SignUp from './page/SignUp';
import Navbar from './components/common/Navbar';
import VerifyOtp from './page/VerifyOtp';
import ForgotPass from './page/ForgotPass';
import ResetPassword from './page/ResetPassword';
import RequestPasswordReset from './page/RequestPasswordReset';
import About from './page/About';
import Contact from './page/Contact';
import Profile from './page/Profile';
import ProfileSettings from './components/profile/ProfileSettings';
import DashboardLayout from './components/layouts/DashboardLayout';
import AddCourses from './page/AddCourses';
import MyCourses from './components/profile/instructor/MyCourses';
import CatagotyPage from './page/CatagotyPage';
import ClickedCourseDetail from './page/ClickedCourseDetail';
import Cart from './page/Cart';
import EnrolledCourses from './page/EnrolledCourses';
import VideoPlayer from './page/VideoPlayer';
import Loader from './page/Loader';

function App() {

  return (
    <div className="bg-richblack-900 min-h-screen font-inter">
      <div className="transition-all duration-500">
        <Navbar />
        <div className="pb-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Signup" element={<SignUp />} />
            <Route path="/Verifyotp" element={<VerifyOtp />} />
            <Route path="/Forgotpassword" element={<ForgotPass />} />
            <Route path="/auth/updatePassword/:id" element={<ResetPassword />} />
            <Route path="/Resetpassword" element={<RequestPasswordReset />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/catalog/:catagoryName" element={<CatagotyPage />} />
            <Route path="/catalog/:catagoryName/courseDetail/:id"
              element={<ClickedCourseDetail />}
            />
            <Route path="watch-lectures" element={<VideoPlayer />} />

            {/* Dashboard routes */}
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route path="my-profile" element={<Profile />} />
              <Route path="settings" element={<ProfileSettings />} />
              <Route path="add-course" element={<AddCourses />} />
              <Route path="enrolled-courses" element={<EnrolledCourses />} />
              <Route path="my-courses" element={<MyCourses />} />
              <Route path="cart" element={<Cart />} />
            </Route>
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;