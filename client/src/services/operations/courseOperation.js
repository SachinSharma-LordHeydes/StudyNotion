import { apiConnector } from "../apiConnector"
import axios from 'axios';
import {categories, courseEndpoints } from '../../services/api'
import {  setCatagory, setClickedCatagoryData, setCourseDetails, setInstructorAllCourse } from "../../features/Courses/coursesSlice";
import { setSuccess } from "../../features/profile/profileSlice";
import { setData, setLoader } from "../../features/auth/authSlice";

const {COURSE_CATEGORIES_API,CREATE_COURSE_API,DELETE_COURSE_API,COURSE_DETAILS_API,EDIT_COURSE_API,ADD_COURSESTATUS_API,GET_ALL_INSTRUCTOR_COURSES_API,GET_COURSE_BY_CATAGORY,ADD_CART_API,REMOVE_CART_API}=courseEndpoints

const {GET_CLICKED_CATEGORIES_API}=categories

const FRONTEND_BASE_URL = import.meta.env.VITE_FRONTEND_BASE_URL;


export function getCatagory(){
  return async(dispatch)=>{
    try {
      const response=await apiConnector('GET',COURSE_CATEGORIES_API);
      console.log("Get CourseCatagory Response => ",response)
      const catagory=response.data.allCatagories;

      dispatch(setCatagory(catagory))

      if (response.data.success) {
        dispatch(setSuccess(true))
      }else{
        dispatch(setSuccess(false))
      }

    } catch (error) {
      console.log("Error Occured while fetching Catagory => ",error)
    }
  }
}


export function createCourse(formData,token){
  return async(dispatch)=>{
    dispatch(setLoader(true))
    try {
      console.log("Create course Form data => ",formData)
      console.log("Received FormData in createCourse:", Object.fromEntries(formData));

      const response=await apiConnector("POST",CREATE_COURSE_API,formData, {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      })

      console.log("Create Course Responese => ",response)
      
      
      if (response) {
        dispatch(setCourseDetails(response.data.data));
      }

      if (response.data.success) {
        dispatch(setSuccess(true))
      }else{
        dispatch(setSuccess(false))
      }

      dispatch(setLoader(false))

    } catch (error) {
      dispatch(setLoader(false))
      console.log("Error while creating course => ",error)
    }
  }
}

export function getCourseDetails(courseId){
  return async(dispatch)=>{
    dispatch(setLoader(true))
    try {

      console.log("getcourse id",courseId)
    

      const response=await apiConnector("POST",COURSE_DETAILS_API,{courseId})

      console.log("Get Course Responese => ",response)

      dispatch(setCourseDetails(response.data.data));

      if (response.data.success) {
        dispatch(setSuccess(true))
      }else{
        dispatch(setSuccess(false))
      }

      dispatch(setLoader(false))

    } catch (error) {
      dispatch(setLoader(false))
      console.log("Error while fetchin course Details => ",error)
    }
  }
}


export function editCourse(formData,token){
  return async(dispatch)=>{
    dispatch(setLoader(true))
    try {

      console.log("Form Data to edit course Data=> ",formData)

      const response=await apiConnector("POST",EDIT_COURSE_API,formData,{
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      })

      console.log("Get edit Course Responese => ",response)

      if (response) {
        // dispatch(setThumbnailPreview(response.data.data.thumbnail));
        dispatch(setCourseDetails(response.data.data));
      }

      if (response.data.success) {
        dispatch(setSuccess(true))
      }else{
        dispatch(setSuccess(false))
      }

      dispatch(setLoader(false))

    } catch (error) {
      dispatch(setLoader(false))
      console.log("Error while editing course Details => ",error)
    }
  }
}

export function addCourseStatus(formData,token){
  return async(dispatch)=>{
    dispatch(setLoader(true))
    try {

      console.log("Form Data to edit add course status Data=> ",formData)

      const response=await apiConnector("POST",ADD_COURSESTATUS_API,formData,{
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      })

      console.log("Add Course status Responese => ",response)

      if (response.data.success) {
        dispatch(setCourseDetails(response.data.data));
        dispatch(setSuccess(true))
      }else{
        dispatch(setSuccess(false))
      }
      dispatch(setLoader(false))

    } catch (error) {
      dispatch(setLoader(false))
      console.log("Error while adding course status Details => ",error)
    }
  }
}

export function deleteCourse(id){
  return async(dispatch)=>{
    dispatch(setLoader(true))
    try {

      const response=await apiConnector("POST",DELETE_COURSE_API,{id})

      console.log("Delete course Response=>",response)

      dispatch(setInstructorAllCourse(response.data))

      dispatch(setLoader(false))
      
    } catch (error) {
      dispatch(setLoader(false))
      console.log("Error while deleting course  => ",error)
    }
  }
}

export function getInstructorCourses(token){
  return async (dispatch)=>{
    dispatch(setLoader(true))
    try {
      const response=await apiConnector("GET",GET_ALL_INSTRUCTOR_COURSES_API,null, {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${token}`
      })
      console.log("Instructor all courses=>",response)
      // if(response.data.success){
      // }
      dispatch(setInstructorAllCourse(response.data))

      dispatch(setLoader(false))
  } catch (error) {
    dispatch(setLoader(false))
    console.log("Error while Fetchin instructor All course Details => ",error)
  }
  }
}

// --------------------------------

export function getClickedCatagoty(catagoryName){
  return async(dispatch)=>{
    dispatch(setLoader(true))
    try {
      const response=await apiConnector('POST',GET_CLICKED_CATEGORIES_API,{catagoryName})
      console.log("Get clicked Catagory response=>",response.data.data)
      dispatch(setClickedCatagoryData(response.data.data))
      dispatch(setLoader(false))
    } catch (error) {
      dispatch(setLoader(false))
      console.log("Error while Fetching clicked catagory => ",error)
    }
  }
}



export function getCourseByCatagory(catagoryName){
  return async(dispatch)=>{
    dispatch(setLoader(true))
    try {
      console.log("catagoryName => ",catagoryName)
      const response=await apiConnector('POST',GET_COURSE_BY_CATAGORY,{catagoryName});

      console.log("courseByCatagory response => ",response)

      dispatch(setLoader(false))

    } catch (error) {
      dispatch(setLoader(false))
      console.log("Error Occured while fetching Courses By Catagory => ",error)
    }
  }
}







// ---------------------------------------------------







export function addToCart(courseID,token,){
  return async(dispatch)=>{
    dispatch(setLoader(true))
    try {
        const addCartResponse = await apiConnector('POST', ADD_CART_API, {
          courseID,
          token,
        });

        console.log("AddCart Response ----------->",addCartResponse)
       
        console.log("AddCart Response in UserData ----------->",addCartResponse.data.data)

        dispatch(setData(addCartResponse.data.data))

        dispatch(setLoader(false))

      } catch (error) {
        dispatch(setLoader(false))
        console.error("Error adding cart details:", error);
      }
  }
}

export function removeFromCart(courseID, token){
  return async(dispatch)=>{
    dispatch(setLoader(true))
    try {
        const removeCartResponse = await apiConnector('POST', REMOVE_CART_API, {courseID, token});
        console.log("Remove cart Response =========> ", removeCartResponse);

        console.log("Remove Cart Response in UserData ----------->",removeCartResponse.data.data)

        dispatch(setData(removeCartResponse.data.data))

        dispatch(setLoader(false))

      } catch (error) {
        dispatch(setLoader(false))
        console.error("Error removeing cart details:", error);
      }
  }
}




// ---------------------------------------------













// Frontend buyCourse function


export function buyCourse(itemId, totalPrice,user){
  return async(dispatch)=>{
    dispatch(setLoader(true))
    try {
      console.log("user to buy----------->",user)
      const backendBaseUrl = import.meta.env.VITE_BACKEND_BASE_URL;
      const frontendBaseUrl = import.meta.env.VITE_FRONTEND_BASE_URL;
      console.log("backendBaseUrl-------->",backendBaseUrl)
      const response = await axios.post(`${backendBaseUrl}/api/v1/payment/initialize-esewa`, {
        user,
        itemId,
        totalPrice: Number(totalPrice).toFixed(2), // Format price to 2 decimal places
      });
  
      const { success, payment, purchasedItemData } = response.data;
  
      if (!success) {
        console.log('Error whiile making payment-----> ', response);
        throw new Error('Failed to initialize payment. ', response);
      }
      
  
      console.log('eSewa Payment Initialization:', payment);
  
      // Step 2: Create eSewa form dynamically
      const paymentForm = {
        amount: Number(totalPrice).toFixed(2),
        failure_url: `${frontendBaseUrl}`,
        product_delivery_charge: '0.00',
        product_service_charge: '0.00',
        product_code: 'EPAYTEST', 
        signature: payment.signature,
        signed_field_names: payment.signed_field_names,
        success_url: `${frontendBaseUrl}/dashboard/enrolled-courses`,
        tax_amount: '0.00',
        total_amount: Number(totalPrice).toFixed(2), 
        transaction_uuid: purchasedItemData._id,
      };
  
      // Step 3: Submit form to eSewa
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = 'https://rc-epay.esewa.com.np/api/epay/main/v2/form'; // eSewa test endpoint
  
      Object.entries(paymentForm).forEach(([key, value]) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = value;
        form.appendChild(input);
      });
  
      console.log('Submitting form with data:', paymentForm);
      document.body.appendChild(form);
      form.submit();

      dispatch(setLoader(false))
    } catch (error) {
      dispatch(setLoader(false))
      console.log("Error----------->",error)
      console.error('Error during payment initiation:', error);
    }
  }
}
