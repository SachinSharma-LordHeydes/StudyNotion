const express = require('express');
const {createSubSectionHandler,deleteSubSection,updateSubSection,getSubSectionHandler} = require('../Controlleres/subSectionHandler');
const { isInstructorMiddleware, authMiddleware } = require('../middleware/authMiddlerwares');
const router = express.Router();

router.post('/course/addSubSection',authMiddleware,isInstructorMiddleware, createSubSectionHandler);
router.post('/course/deleteSubSection',authMiddleware,isInstructorMiddleware, deleteSubSection);
router.post('/course/updateSubSection',authMiddleware,isInstructorMiddleware, updateSubSection);
router.post('/course/getSubSectionHandler',authMiddleware,isInstructorMiddleware, getSubSectionHandler);

module.exports = router;