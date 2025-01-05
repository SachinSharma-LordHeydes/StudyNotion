const express=require('express');
const router=express.Router();

const {signUpHandler,loginHandler,changePasswordHandler,resetPassword,deleteAccountHandler}=require('../Controlleres/auth/authHandler')
// const {loginHandler}=require('../Controlleres/auth/loginHandler');

router.post('/auth/signup',signUpHandler);
router.post('/auth/login',loginHandler);
router.post('/auth/changePassword',changePasswordHandler);
router.post('/auth/reset-password-token',resetPassword);
router.delete('/profile/deleteProfile',deleteAccountHandler);



module.exports = router;