const mongoose=require('mongoose');
const mailSender = require('../utils/mailSender');

require('dotenv').config();

const OTPSchema=new mongoose.Schema(
  {
    email:{
      type:String,
      required:true
    },
    otp:{
      type:String,
      required:true
    },
    createdAt:{
      type:Date,
      required:true,
      default:Date.now(),
      expires:5*60*60,
    },
  }
);

async function sendMail(email,OTP){
  try {
    const mailResponse=await mailSender(email,"Gmail verification",OTP);
    console.log("Mail Sent SuccessFully otp model => ",mailResponse);
    console.log(process.env.MAIL_USER,process.env.MAIL_APP_PASSWORD)
  } catch (error) {
    console.log("Error occured while sending Mail => ",error)
  }
}

OTPSchema.pre('save',async function(next){
  await sendMail(this.email,this.otp);
  next();
})

//tivvnlwdvqyfwwkb  //vbdq wpnd jhkm ozzb

module.exports=mongoose.model('OTPModel',OTPSchema);