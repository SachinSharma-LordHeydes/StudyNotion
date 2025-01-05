const express = require('express');
const {createCourseHandler,getCourseDetails,editCourseHandler,addCourseStatusHandler,getAllCourseDetails,deleteCourseHandler,getCourseByCatagoryHandler} = require('../Controlleres/createCourseHandler');
const { authMiddleware,isInstructorMiddleware } = require('../middleware/authMiddlerwares');
const router = express.Router();

router.post('/course/createCourse',authMiddleware,isInstructorMiddleware, createCourseHandler);
router.post('/course/editCourse',authMiddleware,isInstructorMiddleware, editCourseHandler);
router.post('/course/addCourseStatusHandler',authMiddleware,isInstructorMiddleware, addCourseStatusHandler);
router.post('/course/deleteCourse',authMiddleware,isInstructorMiddleware, deleteCourseHandler);
router.post('/course/getCourseDetails',authMiddleware, getCourseDetails);
router.get('/course/getInstructorCourses',authMiddleware, getAllCourseDetails);
router.post('/course/getCourseByCatagoryHandler',authMiddleware, getCourseByCatagoryHandler);

module.exports = router;