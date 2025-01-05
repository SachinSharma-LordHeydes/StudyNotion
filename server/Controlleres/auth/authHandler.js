const userModel=require('../../Models/userModel');
const OTPModel=require('../../Models/OTPModel');
const profileModle=require('../../Models/profileModel');
const jwt=require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds=10;


require('dotenv').config();


//SignUp
exports.signUpHandler=async(req,res)=>{
  try {
    console.log("req.body=>",req.body)
    const {firstName,lastName,email,password,confirmPassword,accountType,otp}=req.body;


    if(!firstName || !lastName || !email || !password || !confirmPassword || !accountType || !otp){
      return res.status(500).json({
        success:false,
        message:"All fields are required",
      })
    }

    if(confirmPassword!==password){
      return res.status(500).json({
        success:false,
        message:"Password And ConfirmPassword Didn't Match"
      })
    }

    const userExist= await userModel.findOne({email});

    if(userExist){
      return res.status(500).json({
        success:false,
        message:"User already Exists"
      })
    }

    const otpResponse = await OTPModel.findOne({ email }).sort({ createdAt: -1 }).limit(1); 
    //To get The Latest OTP present in OPTModel } {-1=>Decending} {limit(1)=>to get Only ONE putput/response} usong sort with limt can manage order and quantity

    console.log("Backenf OTP response => ",otpResponse);
    
    if (!otpResponse || otp !== otpResponse.otp) {
      return res.status(400).json({
        success: false,
        message: 'The OTP is not valid',
      });
    }

    const encryptedPassword = await bcrypt.hash(password, saltRounds)
    console.log(encryptedPassword);

    const profileDetail=await profileModle.create({
      gender:null,
      DOB:null,
      about:null,
      contactNum:null
    });

    const userResponse=await userModel.create({
       firstName,
      lastName,
      email,
      password: encryptedPassword,
      accountType,
      addDetail: profileDetail._id,
      image: `https://api.dicebear.com/9.x/initials/svg?seed=${firstName} ${lastName}`,
      token: '',
      cart: [],
    });

    return res.status(200).json({
      success:true,
      message:`User Entry Created Successfully`,
      data:userResponse
    })

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success:false,
      message:error.message,
      error:error
    })
  }
}





//Login

exports.loginHandler = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("Backend Check for LOGIN => ", req.body);

    if (!email || !password) {
      return res.status(500).json({
        success: false,
        message: "All fields are required",
      });
    }

    const userExist = await userModel.findOne({ email })
      .populate("cart")
      .populate("addDetail");

    if (!userExist) {
      return res.status(500).json({
        success: false,
        message: "User doesn't Exist. Please SignUp before logging in.",
      });
    }

    const isMatch = await bcrypt.compare(password, userExist.password);

    if (!isMatch) {
      return res.status(403).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const payload = {
      email: userExist.email,
      id: userExist._id,
      accountType: userExist.accountType,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      // expiresIn: "infinity"
    });


    userExist.token = token;
    await userExist.save();

    userExist.password = undefined;

    console.log("Backend userExist => ", userExist);

    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // Cookie expiration time (3 days)
    };

    const addDetail=await profileModle.findById(userExist.addDetail)

    console.log("Login Additional Details => ",addDetail);
    
    res.cookie('token', token,options).status(200).json({
      success: true,
      token,
      userExist,
      addDetail,
      message: "Logged In Successfully",
    });

    console.log("login res => ",res)

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};





//ChangePassword
exports.changePasswordHandler=async(req,res)=>{
  try {
    const {email,oldPassword,newPassword,confirmNewPassword}=req.body;

    const isValidUser=await userModel.findOne({email});

    // console.log("IsValid response => ",isValidUser);

    const isMatch = await bcrypt.compare(oldPassword, isValidUser.password);

    if(!isValidUser || !isMatch){
      return res.status(500).json({
        success:false,
        messsage:"Invalid Crendiantials"
      })
    }

    if(newPassword!==confirmNewPassword){
      return res.status(500).json({
        success:false,
        message:"New Password and Confirm New Password Doesn't Match"
      })
    }
    
    const encryptedPassword = await bcrypt.hash(newPassword, saltRounds)
    await userModel.findOneAndUpdate({email},{password:encryptedPassword});

    return res.status(200).json({
      success:true,
      message:"Password Changed SuccessFully"
    })


  } catch (error) {
    return res.status(500).json({
      success:false,
      message:`Unable to change Password with error => ${error}`
    })
  }
}



//reset Password

exports.resetPassword=async(req,res)=>{
try {
  const {token,password,confirmPassword}=req.body;
  
  if(password!==confirmPassword){
    return res.status(500).json({
      success:false,
      message:"Password And Confirm Password Are Different"
    });
  }

  console.log(token)

  
  const userExists=await userModel.findOne({token:token});
  
  console.log("userexirs => ",userExists)
  
  if(!userExists){
    return res.status(403).json({
      success:false,
      message:"Token is Invalid"
    });
  }
  
  // console.log("resetPasswordExpires=>",userExists.resetPasswordExpires);
  
  if(userExists.resetPasswordExpires<Date.now()){
    return res.status(403).json({
      success:false,
      message:"Token Has Expired"
    });
  }
  console.log("first");

    const hashedPassword=await bcrypt.hash(password,saltRounds);

    await userModel.findOneAndUpdate(
      {
        token:token
      },
      {
        password:hashedPassword,
      },
      {
        new:true
      }
    );
    return res.status(200).json({
      success:true,
      message:"Your Password Was Reset SuccessFully"
    })
  } catch (error) {
    return res.status(500).json({
      success:false,
      message:`Something went wrong while reseting the Password => ${error}`
    })
  }
  
}



exports.deleteAccountHandler = async (req, res) => {
  try {
    const { token } = req.body;

    console.log("Token backend => ", req.body.token);

    const user = await userModel.findOne({ token: token });

    if (!user) {
      return res.status(403).json({
        success: false,
        message: "Cannot Delete The User, User Doesn't Exist",
      });
    }

    // Use deleteOne() to trigger the pre-deleteOne hook
    await user.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Successfully Deleted Account",
    });
  } catch (error) {
    console.log("Backend Delete account => ", error);
    return res.status(503).json({
      success: false,
      message: "Error occurred while Deleting The User",
      error: error,
    });
  }
};
