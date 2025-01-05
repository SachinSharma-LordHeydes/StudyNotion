const cloudinary = require('cloudinary').v2

require('dotenv').config();

exports.cloudinaryConnect=async()=>{
  try {
    cloudinary.config({
      api_key:process.env.CLOUD_API_KEY,
      api_secret:process.env.CLOUD_API_SECRET,
      cloud_name:process.env.CLOUD_NAME
    })
    console.log("Successfully Connected To cloudinary");
  } catch (error) {
    console.log(error);
    console.log('Cloudinary Connection Failed')
  }
}