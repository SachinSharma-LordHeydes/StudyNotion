const otpGenerator = require('otp-generator');
const OTPModel = require('../../Models/OTPModel');
const userModel = require('../../Models/userModel');

exports.otpGeneratorHandler = async (req, res) => {
  try {
    const { email } = req.body;
    // Check if user is already present
    const checkuserModelPresent = await userModel.findOne({ email });
    // If user found with provided email
    if (checkuserModelPresent) {
      return res.status(401).json({
        success: false,
        message: 'User is already registered',
      });
    }
    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    let result = await OTPModel.findOne({ otp: otp });
    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
      });
      result = await OTPModel.findOne({ otp: otp });
    }
    const otpPayload = { email, otp };
    const otpBody = await OTPModel.create(otpPayload);
    
    res.status(200).json({
      success: true,
      message: 'OTP sent successfully',
      data:otpBody,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
};