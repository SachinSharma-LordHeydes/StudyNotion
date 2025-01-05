const express = require('express');
const {resetPassMailHandler} = require('../Controlleres/auth/resetPassMailHandler');
const router = express.Router();

router.post('/auth/send-reset-password-mail', resetPassMailHandler);

module.exports = router;