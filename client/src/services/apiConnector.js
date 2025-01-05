
import axios from 'axios';

export const apiConnector = async (method, url, bodydata, headers = {}, params) => {
  try {
    const userDataString = localStorage.getItem('userData');
    const userData = JSON.parse(userDataString);
    const token = userData?.token;
    console.log("Token:", token);

    const config = {
      method,
      url,
      data: bodydata ? bodydata : null,
      headers: {
        ...headers,  // Merge with any headers you pass
        Authorization: token ? `Bearer ${token}` : '',
      },
      params: params ? params : null,
    };
    
    const response = await axios(config);
    return response;
  } catch (error) {
    console.error("API Connector Error:", error);
    if (error.response) {
      // Server responded with a status other than 2xx
      console.error("Response Data:", error.response.data);
      console.error("Response Status:", error.response.status);
      console.error("Response Headers:", error.response.headers);
    } else if (error.request) {
      // No response received
      console.error("Request Data:", error.request);
    } else {
      // Something else happened
      console.error("Error Message:", error.message);
    }
    throw error;
  }
};
