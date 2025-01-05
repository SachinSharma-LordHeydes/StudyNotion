const express = require('express');
const {profileHandler,updateProfile,updateProfilePicture,profileInfoHandler,getUserDetails} = require('../Controlleres/profileHandler');

const router = express.Router();

router.post('/profile/getUserProfile', profileInfoHandler);
router.post('/profile/getUserDetails', getUserDetails);
router.post('/profile/updateProfile',updateProfile);
router.post('/profile/updateProfilePicture',updateProfilePicture);

module.exports = router;