const express = require('express');
const {otpGeneratorHandler} = require('../Controlleres/auth/otpGeneratorHandler');
const router = express.Router();

router.post('/auth/sendotp', otpGeneratorHandler);

module.exports = router;