import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { deleteAccount, updateProfile, updateProfilePicture } from '../../services/operations/profileOperation';
import YellowBlackBtn from '../HomePage/YellowBlackBtn';
import { LuUpload } from "react-icons/lu";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';

function ProfileSettings() {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.auth);
   const {profileInfo}=useSelector((state)=>state.profile)

  const [profileImage, setProfileImage] = useState(userData?.image || userData?.imageURL );
  const [selectedFile, setSelectedFile] = useState(null);

  const navigate=useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: userData?.firstName,
      lastName: userData?.lastName,
      gender: profileInfo?.gender,
      DOB: profileInfo?.DOB,
      description: userData?.description,
      contactNum: profileInfo?.contactNum,
    }
  });

  const handleProfile = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setProfileImage(imageURL);
      setSelectedFile(file);
      console.log("Selected file:", file); // Add this to verify file selection
    }
  };

  const submitInfoHandler = async (data) => {
    console.log("Submitting profile data:", data);
    await dispatch(updateProfile(data, userData?.token,navigate));
  };

  const submitImageHandler = async (e) => {
    e.preventDefault();
    if (selectedFile) {
      const formData = new FormData();
      formData.append('image', selectedFile);
      formData.append('token', userData?.token);
      await dispatch(updateProfilePicture(formData));
    }
  };

  const handelDelete=async()=>{
    console.log("Delete Account Clicked=> ",userData?.token)
    const token=userData?.token
    await dispatch(deleteAccount(token,navigate))
  }

  function handelCancel(){
    console.log("Clicked")
  }

  return (

    <div className=''>
      <div className='flex bg-richblack-800 px-9 py-5 rounded-xl justify-between items-center pt-16 mt-9'>
        <div className='flex items-center gap-5'>
          <div>
            <img className='size-20 rounded-full' src={profileImage || userData?.image || userData?.imageURL} alt="Profile" />
          </div>
          <div>
            <h1 className='text-xl font-bold'>Change Profile Picture</h1>
            <div className='flex gap-x-5 mt-1'>
              <div className='relative'>
                <YellowBlackBtn>
                  <input 
                    type="file" 
                    onChange={handleProfile}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  Select File
                </YellowBlackBtn>
              </div>
              <div>
                <button onClick={submitImageHandler}>
                  <YellowBlackBtn colour={"Yellow"}>Upload <LuUpload/></YellowBlackBtn>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='mt-9 bg-richblack-800 px-9 py-9 rounded-xl justify-between items-center'>
        <h1 className='text-xl font-bold'>Profile Information</h1>
        <form onSubmit={handleSubmit(submitInfoHandler)}>
          <div className='mt-9 grid grid-cols-2 gap-x-20 gap-y-5'>
            <div className='flex flex-col'>
              <label htmlFor="firstName">First Name</label>
              <input 
                className='bg-richblack-600 py-3 px-4 mt-2 rounded-md' 
                type="text" 
                id="firstName" 
                {...register('firstName', { required: "First name is required" })}
              />
              {errors.firstName && <span className="text-red-500">{errors.firstName.message}</span>}
            </div>
            <div className='flex flex-col'>
              <label htmlFor="lastName">Last Name</label>
              <input 
                className='bg-richblack-600 py-3 px-4 mt-2 rounded-md' 
                type="text" 
                id="lastName" 
                {...register('lastName', { required: "Last name is required" })}
              />
              {errors.lastName && <span className="text-red-500">{errors.lastName.message}</span>}
            </div>
            <div className='flex flex-col'>
              <label htmlFor="DOB">Date of Birth</label>
              <input 
                className='bg-richblack-600 py-3 px-4 mt-2 rounded-md' 
                type="date" 
                id="DOB" 
                {...register('DOB')}
              />
            </div>
            <div className='flex flex-col'>
              <label htmlFor="gender">Gender</label>
              <select 
                className='bg-richblack-600 py-3 px-4 mt-2 rounded-md' 
                id="gender"
                {...register('gender')}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className='flex flex-col'>
              <label htmlFor="contactNum">Contact Number</label>
              <input 
                className='bg-richblack-600 py-3 px-4 mt-2 rounded-md' 
                type="text" 
                id="contactNum" 
                {...register('contactNum')}
              />
            </div>
            <div className='flex flex-col'>
              <label htmlFor="about">About</label>
              <textarea 
                className='bg-richblack-600 py-3 px-4 mt-2 rounded-md' 
                id="description" 
                {...register('description')}
              />
            </div>
          </div>
          <div className='flex gap-x-5 justify-end mt-9'>
            <div>
              <button type="button" onClick={handelCancel}>
                <YellowBlackBtn type="button">Cancel</YellowBlackBtn>
              </button>
            </div>
            <div>
              <button type="submit">
                <YellowBlackBtn  type="submit" colour={"Yellow"}>Save</YellowBlackBtn>
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className='mt-9 px-9 py-9 bg-[#340019] rounded-lg'>
      <div className='flex items-center gap-x-9'>
        <div className=''>
            <RiDeleteBin6Fill size={35} color='' />
          </div>
          <div>
            <h1 className='text-xl font-semibold'>Delete Account</h1>
            <p className='mt-5'>
              Would you like to delete account?
            </p>
            <p>
              This account may contain Paid Courses. Deleting your account is permanent and will remove all the contain associated with it.
            </p>
            <button onClick={handelDelete}  className='text-[#ff203a] font-mono mt-3 text-lg'>I want to delete my account.</button>
          </div>
      </div>
      </div>
    </div>
  );
}

export default ProfileSettings;