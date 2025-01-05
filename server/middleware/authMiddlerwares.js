const jwt=require('jsonwebtoken');

require('dotenv').config();

exports.authMiddleware=async (req,res,next)=>{
  try {
    // const token =req.cookie.token || req.body.token || req.header("Authorisation").replace("Bearer "," ");

    
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    console.log("token=> ",token);

    if(!token){
      return res.status(401).json({
        success:false,
        message:"Unauthorize Token"
      });
    }

    try {
      const decode=jwt.verify(token,process.env.JWT_SECRET);
      console.log(decode);
      req.user=decode;   //-> console.log(req)*********
      // console.log("req.user => ",req.user)
    } catch (error) {
      return res.status(401).json({
        success:false,
        message:`Token has Expired => ${error}`
      });
  }
  next();

  } catch (error) {
      return res.status(401).json({
        success:false,
        message:`Error Occured while validation TOKEN => ${error}`
      });
  }
}



//validate Student

exports.isStudentMiddleware=(req,res,next)=>{
  try {
    if(req.user.accountType!=="Student"){
      return res.status(401).json({
        success:false,
        message:`Protected Route For Students Only`
      })
    }
    next()
  } catch (error) {
    return res.status(500).json({
      success:false,
      message:`Account Type cannot be Verified => ${error}`
    });
  }
}



//validate Insructor

exports.isInstructorMiddleware=(req,res,next)=>{
  try {
    console.log("req.user => ",req.user)
    if(req.user.accountType!=="Instructor"){
      return res.status(401).json({
        success:false,
        message:`Protected Route For Instructors Only`
      })
    }
    next()
  } catch (error) {
    return res.status(500).json({
      success:false,
      message:`Account Type cannot be Verified => ${error}`
    });
  }
}



//validate Admin

exports.isAdminMiddleware=(req,res,next)=>{
  try {
    if(req.user.accountType!=="Admin"){
      return res.status(401).json({
        success:false,
        message:`Protected Route For Admins Only`
      })
    }
    next()
  } catch (error) {
    return res.status(500).json({
      success:false,
      message:`Account Type cannot be Verified => ${error}`
    });
  }
}