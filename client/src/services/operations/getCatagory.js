import { setLoader } from '../../features/auth/authSlice';
import { categories } from '../../services/api';
import { apiConnector } from '../apiConnector';

const {CATEGORIES_API}=categories

export const getCatagoty=async()=>{
  let result=[];
  try {
    setLoader(true)
    const response=await apiConnector('GET',CATEGORIES_API)
    console.log('Catagory Response => ',response?.data?.allCatagories);
    result=response?.data?.allCatagories;
    setLoader(false)
  } catch (error) {
    setLoader(false)
    console.log("Error while Fetching catagory => ",error)
  }
  return result;
}
