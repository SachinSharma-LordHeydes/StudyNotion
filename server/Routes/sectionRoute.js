const express = require('express');
const {createSectionHandler,getSectionHandler,updateSection,deleteSection,getAllSectionHandler} = require('../Controlleres/sectionHandler');
const router = express.Router();

router.post('/course/addSection',createSectionHandler);
router.post('/course/updateSection',updateSection);
router.delete('/course/deleteSection',deleteSection);
router.post('/course/getSection',getSectionHandler);
router.post('/course/getAllSection',getAllSectionHandler);

module.exports = router;