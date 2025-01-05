const profileModel = require("../Models/profileModel");
const userModel = require("../Models/userModel");
const { uploadFiles } = require("../utils/fileUploader");
const jwt = require("jsonwebtoken");


exports.profileInfoHandler=async(req,res)=>{
  try {
    const {profileID}=req.body;

    console.log("Backend Get profileID -> ",profileID)

    const profileResponse=await profileModel.findById(profileID);

    return res.status(200).json({
      success:true,
      message:"SuccessFully fetched the data",
      data:profileResponse
    })


  } catch (error) {
    console.log("Error while Fetchinf userDetails => ",error)
    return res.status(500).json({
      success:false,
      message:"Unable to fetch thr user Details of the user"
    })
  }
}


exports.getUserDetails=async(req,res)=>{
  try {
    const {id}=req.body;

    console.log("Backend Get user Detail Token -> ",id)

    const response=await userModel.findById(id)
      .populate('cart')
      .populate('courseEnrolled')

    if(!response){
      return res.status(403).json({
        success:false,
        message:"Profile of this doesnt Exits"
      })
    }

    return res.status(200).json({
      success:true,
      message:"SuccessFully fetched the data",
      data:response
    })


  } catch (error) {
    console.log("Error while Fetchinf Data => ",error)
    return res.status(500).json({
      success:false,
      message:"Unable to fetch thr profile data of the user",
      error:error.message
    })
  }
}




exports.updateProfile = async (req, res) => {
  try {
    const { gender, DOB, description, contactNum, firstName, lastName, token } = req.body;

    console.log("detailes => ",gender, DOB, description, contactNum, firstName, lastName,)
    
    console.log("Backend token => ", token);
    
    const userDetail = await userModel.findOne({ token: token });
    
    if (!userDetail) {
      return res.status(403).json({
        success: false,
        message: "User not found..",
      });
    }
    
    const profileID = userDetail.addDetail;
    
    const updatedProfile = await profileModel.findByIdAndUpdate(profileID, {
      gender,
      DOB,
      about:description,
      contactNum,
    },
    {
      new:true
    }
  );
    
    const updatedUser = await userModel.findOneAndUpdate(
      { token: token },
      {
        firstName,
        lastName,
      },
      { new: true }
    );
    
    if (!updatedUser) {
      throw new Error('Failed to update user');
    }
    
    return res.status(200).json({
      success: true,
      message: "Profile Updated Successfully",
      data1: updatedUser,
      data2: updatedProfile,

    });
  } catch (error) {
    console.error("Profile update error:", error);
    return res.status(500).json({
      success: false,
      message: `Profile is Unable to Update because of ERROR => ${error.message}`
    });
  }
}






exports.updateProfilePicture = async (req, res) => {
  try {
    const { token } = req.body;


    let decodedToken;
        try {
          decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
          return res.status(401).json({
            success: false,
            message: "Invalid or expired token.",
          });
        }
        const userID = decodedToken.id;
    
    console.log("Backend token ==============> ", token);
    console.log("backend Req =======================> ", req.files);
    
    if (!req.files || !req.files.image) {
      return res.status(400).json({
        success: false,
        message: "No image available",
      });
    }
    
    const { image } = req.files;
    
    // const userDetail = await userModel.findOne({ token: token });

    const userDetail = await userModel.findById(userID)
    
    if (!userDetail) {
      return res.status(403).json({
        success: false,
        message: "User not found..",
      });
    }


    
    const fileUploadResponse = await uploadFiles(image, 'studynotion');
    
    if (!fileUploadResponse) {
      return res.status(500).json({
        success: false,
        message: "Error occurred while uploading image",
      });
    }
    
    console.log("Backend File upload response => ", fileUploadResponse);
    
    const updatedUser = await userModel.findByIdAndUpdate(
      userID,
      {
        image: fileUploadResponse.data.secure_url
      },
      { new: true }
    );

    console.log("Updated User ------------------->",updatedUser)
    
    if (!updatedUser) {
      throw new Error('Failed to update user');
    }
    
    return res.status(200).json({
      success: true,
      message: "Profile Picture Updated Successfully",
      data: updatedUser
    });
  } catch (error) {
    console.error("Profile Picture update error:", error);
    return res.status(500).json({
      success: false,
      message: `Profile Picture is Unable to Update because of ERROR => ${error.message}`,
      error:error.message
    });
  }
}