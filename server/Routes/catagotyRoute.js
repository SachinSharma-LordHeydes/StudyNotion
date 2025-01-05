const express = require('express');
const {createCatagoryHandler,showAllCatagoryHandler,getClickedCatagoryHandler} = require('../Controlleres/catagoryHandler');
const { authMiddleware ,isAdminMiddleware} = require('../middleware/authMiddlerwares');
const router = express.Router();

router.post('/course/createcatagoty',authMiddleware,isAdminMiddleware,createCatagoryHandler);
router.get('/course/showAllCategories', showAllCatagoryHandler);
router.post('/course/getClickedCatagory', getClickedCatagoryHandler);

module.exports = router;