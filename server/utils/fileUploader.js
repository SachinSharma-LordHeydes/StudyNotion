
const cloudinary = require('cloudinary').v2;

exports.uploadFiles=async(file,folder)=>{
  
  // Updated to support more image and video formats
  const supportedTypes = [
    // Image formats
    'jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp', 'tiff', 'tif',
    // Video formats
    'mp4', 'avi', 'mkv', 'mov', 'wmv', 'flv', 'webm',
    // Document formats (if needed)
    'pdf', 'doc', 'docx', 'txt'
  ];
  
  console.log("File => ",file)
  
  if (!file || !file.tempFilePath) {
    console.log("No file uploaded or tempFilePath is missing.");
    return {
      success: false,
      message: "No file uploaded.",
    };
  }
  
  const filetype = file.name.split('.').pop().toLowerCase();
  if(!supportedTypes.includes(filetype)){
    console.log(`File Type '${filetype}' Not Supported`);
    return {
      success: false,
      message: `File type '${filetype}' not supported. Supported types are: ${supportedTypes.join(', ')}.`,
    };
  }

  // Determine resource type based on file extension
  const getResourceType = (fileType) => {
    const imageTypes = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp', 'tiff', 'tif'];
    const videoTypes = ['mp4', 'avi', 'mkv', 'mov', 'wmv', 'flv', 'webm'];
    const documentTypes = ['pdf', 'doc', 'docx', 'txt'];
    
    if (imageTypes.includes(fileType)) return 'image';
    if (videoTypes.includes(fileType)) return 'video';
    if (documentTypes.includes(fileType)) return 'raw';
    return 'auto';
  };

  const resourceType = getResourceType(filetype);
  
  const options = {
    folder: folder,
    resource_type: resourceType,
    // Add quality optimization for images
    ...(resourceType === 'image' && {
      quality: 'auto:good'
    }),
    // Add size limits for images
    ...(resourceType === 'image' && {
      transformation: [{
        width: 1920,
        height: 1080,
        crop: 'limit',
        quality: 'auto:good'
      }]
    })
  };

  try {
    const result = await cloudinary.uploader.upload(file.tempFilePath, options);
    console.log("Upload successful => ", {
      public_id: result.public_id,
      secure_url: result.secure_url,
      format: result.format,
      resource_type: result.resource_type,
      bytes: result.bytes
    });
    
    return {
      success: true,
      data: result,
      message: "File uploaded successfully"
    };
  } catch (error) {
    console.error("Error uploading to Cloudinary:", {
      error: error.message,
      fileName: file.name,
      fileSize: file.size,
      timestamp: new Date().toISOString()
    });
    
    return {
      success: false,
      message: "Error uploading file to Cloudinary.",
      error: error.message,
    };
  }
}
