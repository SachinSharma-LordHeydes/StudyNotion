const express = require('express');
const {createSectionHandler,getSectionHandler,updateSection,deleteSection,getAllSectionHandler} = require('../Controlleres/sectionHandler');
const { authMiddleware, isInstructorMiddleware } = require('../middleware/authMiddlerwares');
const router = express.Router();

router.post('/course/addSection', authMiddleware, isInstructorMiddleware, createSectionHandler);
router.post('/course/updateSection', authMiddleware, isInstructorMiddleware, updateSection);
router.delete('/course/deleteSection', authMiddleware, isInstructorMiddleware, deleteSection);
router.post('/course/getSection', authMiddleware, getSectionHandler);
router.post('/course/getAllSection', authMiddleware, getAllSectionHandler);

module.exports = router;