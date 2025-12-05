const courseModel = require("../Models/courseModel");
const sectionModel = require("../Models/sectionModel");
const userModel = require("../Models/userModel");
const mongoose = require('mongoose');






exports.getSectionHandler=async(req,res)=>{
  try {
    console.log("getSection Handler req.bofy------>",req.body)
    const {id}=req.body;

    if(!id){
      return res.status(403).json({
        success:false,
        message:'Id Unavilable'
      })
    }

    const response=await sectionModel.findById(id);
    
    if(!response){
      return res.status(403).json({
        success:false,
        message:'Invalid ID/course Not Found'
      })
    }
    console.log("Fetch section Data =>",response)

    return res.status(200).json({
      success:true,
      message:"Section Fetched Successfully",
      data:response
    })
    
  } catch (error) {
    return res.status(500).json({
      success:false,
      message:`Unable to Get Section`,
      error:error
    })
  }
}

exports.getAllSectionHandler=async(req,res)=>{
  try {
    console.log("Allsection Request body =>>>>>>>>",req.body)
    const {id}=req.body
    console.log("Allsection ID =>>>>>>>>",id)
    const response=await courseModel.findById(id)
    .populate({
      path: 'courseContent',           // Populates courseContent (section)
      select: 'sectionName subSection', // Select sectionName and subSection field
      populate: {
        path: 'subSection',            // Populates subSection nested within courseContent
        model: 'subSectionModel',      // Reference the correct model
        select: 'title'                // Select only the title field
      }
    })
    .populate({
      path: 'instructor',            // Populates 'instructor' details
      model: 'userModel',
      select: 'firstName lastName image addDetail', // Select specific fields from user
      populate: {
        path: 'addDetail',           // Populates 'addDetail' for user profile
        model: 'profileModel',
        select: 'about'              // Select the 'about' field from the profile
      }
    });;

    
    if(!response){
      return res.status(403).json({
        success:false,
        message:'Invalid ID/course Not Found'
      })
    }
    console.log("Fetched All section Data =>>>>>>>>>>>",response)

    return res.status(200).json({
      success:true,
      message:"All Section Data Fetched Successfully",
      data:response,
    })
    
  } catch (error) {
    return res.status(500).json({
      success:false,
      message:`Unable to Get AllSection`,
      error:error.message
    })
  }
}

exports.createSectionHandler = async (req, res) => {
  try {
    console.log("Req => ", req.body);
    console.log("Request Params => ", req.params);

    const { sectionName, id, courseId } = req.body;
    
    // Validate required fields
    if (!sectionName || !sectionName.trim()) {
      return res.status(400).json({
        success: false,
        message: "Section Name is required"
      });
    }

    // Check for course ID in multiple possible fields
    const courseIdToUse = courseId || id;
    if (!courseIdToUse) {
      return res.status(400).json({
        success: false,
        message: "Course ID is required"
      });
    }

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(courseIdToUse)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Course ID format"
      });
    }

    // Check if course exists
    const courseExists = await courseModel.findById(courseIdToUse);
    if (!courseExists) {
      return res.status(404).json({
        success: false,
        message: "Course not found"
      });
    }

    // Create the section
    const newSection = await sectionModel.create({
      sectionName: sectionName.trim()
    });

    if (!newSection) {
      return res.status(500).json({
        success: false,
        message: "Failed to create section"
      });
    }

    // Push the section ID into the courseContent array
    const updatedCourse = await courseModel.findByIdAndUpdate(
      courseIdToUse,
      {
        $push: {
          courseContent: newSection._id
        }
      },
      { new: true } // to return the updated document
    ).populate({
      path: "courseContent",  // Populate courseContent, which holds section IDs
      populate: {
        path: "subSection",  // Populate subSection inside each section
        model: "subSectionModel",  // Reference to subSection model
        select: "title description videoURL"  // Select specific fields to be returned
      }
    });

    if (!updatedCourse) {
      // If course update failed, clean up the created section
      await sectionModel.findByIdAndDelete(newSection._id);
      return res.status(500).json({
        success: false,
        message: "Failed to update course with new section"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Section Created Successfully",
      data: updatedCourse
    });

  } catch (error) {
    console.error("Error in createSectionHandler:", {
      error: error.message,
      stack: error.stack,
      requestBody: req.body,
      timestamp: new Date().toISOString()
    });
    
    return res.status(500).json({
      success: false,
      message: "Internal server error while creating section",
      error: error.message
    });
  }
};


exports.updateSection=async(req,res)=>{
  try {

    console.log("Update section req.body--------->",req.body)
    const {sectionName,id}=req.body;
    if(!sectionName || !id){
      return res.status(403).json({
        success:true,
        message:`Section Name and Id of The User is Not Present`
      })
    }

    const isValidSection=await sectionModel.findById(id);
    console.log("isValidSection response--------->",isValidSection)

    const updatedSection= await sectionModel.findByIdAndUpdate(
      id,
      {
        sectionName
      },
      {new:true}
    )

    const updatedCourse=await courseModel.findOne(
      {courseContent:id},
      { new: true } // to return the updated document
    ).populate({
      path: "courseContent",  // Populate courseContent, which holds section IDs
      populate: {
        path: "subSection",  // Populate subSection inside each section
        model: "subSectionModel",  // Reference to subSection model
        select: "title description videoURL"  // Select specific fields to be returned
      }
    });

    console.log("UpdateSection response--------->",updatedSection)
    console.log("UpdateSection Course--------->",updatedCourse)




    return res.status(200).json({
      success:true,
      message:"SubSection Updated Successfully",
      data:updatedCourse
    })
    
  } catch (error) {
    return res.status(500).json({
      success:false,
      message:`Unable to Update SubSection because of ERROR`,
      error:error
    })
  }
}

exports.deleteSection=async(req,res)=>{
  try {

    const {id,courseId}=req.body;

    console.log("Section ID: ", id);
    console.log("Course ID: ", courseId);

    if(!id){
      return res.status(403).json({
        success:true,
        message:`Section Name and Id of The User is Not Present`
      })
    }


    const deletedSection = await sectionModel.findByIdAndDelete(id);
    
    if (!deletedSection) {
      return res.status(404).json({
        success: false,
        message: 'Section not found'
      });
    }


    const updatedCourse = await courseModel.findByIdAndUpdate(
      courseId,
      {
        $pull: {
          courseContent: id
        }
      },
      { new: true }
    ).populate({
      path: "courseContent",  // Populate courseContent, which holds section IDs
      populate: {
        path: "subSection",  // Populate subSection inside each section
        model: "subSectionModel",  // Reference to subSection model
        select: "title description videoURL"  // Select specific fields to be returned
      }
    });

    return res.status(200).json({
      success:true,
      message:"Section Deleted Successfully",
      data:updatedCourse
    })
    
  } catch (error) {
    return res.status(500).json({
      success:false,
      message:`Unable to delete Section because of ERROR`,
      error:error
    })
  }
}