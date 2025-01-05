const userModel = require("../../Models/userModel");
const mailSender = require("../../utils/mailSender");
const crypto = require('crypto');
require("dotenv").config();



exports.resetPassMailHandler=async(req,res)=>{
  try {
    const {email} =req.body;

    const userExists=await userModel.findOne({email});

    if(!userExists){
      return res.status(401).json({
        success:false,
        message:`Invalid email address Cannot send mail for restting Your Password`
      });
    }

    const  newToken=crypto.randomUUID();

    const updatedUser=await userModel.findOneAndUpdate(
      {
        email:email
      },
      {
        token:newToken,
        resetPasswordExpires:Date.now()+5*60*1000,
      },
      {
        new:true
      }
    );
    console.log(updatedUser)

    const resetURl=`${process.env.FRONTEND_URL}/auth/updatePassword/${newToken}`;
    // const resetURl=`https://studynotionfrontend-7fp0.onrender.com/auth/updatePassword/${newToken}`;
    console.log("eset URl-------->,",resetURl)
    await mailSender(email,`Reset your Password`,`Click the Link Below To Reset Your Password ${resetURl}`);

    return res.status(200).json({
      success:true,
      message:"Reset Mail Sent SuccessFully , Please Check Your Mail",
      url:resetURl
    })

  } catch (error) {
    return res.status(500).json({
      success:false,
      message:`Failed To Send Reset Password Mail Beacuse Of Error => ${error}`
    })
  }

}