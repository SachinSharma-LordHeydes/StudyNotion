
const cloudinary = require('cloudinary').v2;

exports.uploadFiles=async(file,folder)=>{
  
  const suportedType=['jpg','jpeg','png','mp4'];
  console.log("File => ",file)
  
  if (!file || !file.tempFilePath) {
    console.log("No file uploaded or tempFilePath is missing.");
    return {
      success: false,
      message: "No file uploaded.",
    };
  }
  
  const filetype = file.name.split('.').pop().toLowerCase();
  if(!suportedType.includes(filetype)){
    console.log("File Type Not Supported");
    return {
      success: false,
      message: "File type not supported. Supported types are jpg, jpeg, png and mp4.",
    };
  }

  const options = {
    folder: folder,
    resource_type: "auto",
  };

  try {
    const result = await cloudinary.uploader.upload(file.tempFilePath, options);
    console.log("Result => ",result)
    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.log("Error uploading to Cloudinary:", error);
    return {
      success: false,
      message: "Error uploading file to Cloudinary.",
      error: error.message,
    };
  }
}



// const cloudinary = require('cloudinary').v2;

// exports.uploadFiles = async (file, folder) => {
//   const supportedTypes = ['jpg', 'jpeg', 'png'];
//   const filetype = file.originalname.split('.').pop().toLowerCase();

//   if (!supportedTypes.includes(filetype)) {
//     console.log("File Type Not Supported");
//     return;
//   }

//   const options = {
//     folder: folder,
//     resource_type: "auto",
//   };

//   try {
//     const result = await cloudinary.uploader.upload(file.tempFilePath, options);
//     return result;
//   } catch (error) {
//     console.log("Error uploading to Cloudinary:", error);
//     throw error;
//   }
// }

