const userModel = require("../Models/userModel");
const courseModel = require("../Models/courseModel");
const catagoryModel = require("../Models/catagoryModel");
const { uploadFiles } = require("../utils/fileUploader");
const sectionModel = require("../Models/sectionModel");
const mongoose = require('mongoose');

// Helper function to validate required fields
const validateCourseData = (data, thumbnail) => {
  const { courseName, courseDescp, whatWillYouLearn, price, catagory } = data;
  
  const missingFields = [];
  if (!courseName?.trim()) missingFields.push('courseName');
  if (!courseDescp?.trim()) missingFields.push('courseDescp');
  if (!whatWillYouLearn?.trim()) missingFields.push('whatWillYouLearn');
  if (!price || isNaN(price) || price <= 0) missingFields.push('price');
  if (!catagory?.trim()) missingFields.push('catagory');
  if (!thumbnail) missingFields.push('thumbnail');
  
  return missingFields;
};

// Helper function to parse course tags safely
const parseCourseTag = (courseTag) => {
  if (!courseTag) return [];
  
  try {
    if (typeof courseTag === 'string') {
      return JSON.parse(courseTag);
    }
    if (Array.isArray(courseTag)) {
      return courseTag;
    }
    return [];
  } catch (error) {
    console.warn("Failed to parse courseTag, using empty array:", error);
    return [];
  }
};

// Helper function to validate ObjectId
const isValidObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

exports.createCourseHandler = async (req, res) => {
  const session = await mongoose.startSession();
  
  try {
    // Start transaction for data consistency
    session.startTransaction(); // Ensure transaction is explicitly started
    
    const { courseName, courseDescp, whatWillYouLearn, price, catagory, status = "Draft", courseTag } = req.body;
    const userId = req.user.id;
    
    // Validate user authentication
    if (!userId || !isValidObjectId(userId)) {
      return res.status(401).json({
        success: false,
        message: "Invalid user authentication"
      });
    }
    
    // Validate thumbnail file
    if (!req.files?.thumbnail) {
      return res.status(400).json({
        success: false,
        message: "Thumbnail file is required"
      });
    }
    
    const thumbnail = req.files.thumbnail;
    
    // Validate required fields
    const missingFields = validateCourseData(req.body, thumbnail);
    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(', ')}`
      });
    }
    
    // Parse course tags
    const parsedCourseTags = parseCourseTag(courseTag);
    
    // Validate status
    if (!['Draft', 'Published'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Status must be either 'Draft' or 'Published'"
      });
    }
    
    // Parallel fetch of instructor and category for better performance
    const [instructorDetail, catagoryDetail] = await Promise.all([
      userModel.findById(userId).select('_id name email'),
      catagoryModel.findOne({ name: catagory }).select('_id name')
    ]);
    
    // Validate instructor exists
    if (!instructorDetail) {
      return res.status(404).json({
        success: false,
        message: "Instructor not found"
      });
    }
    
    // Validate category exists
    if (!catagoryDetail) {
      return res.status(404).json({
        success: false,
        message: `Category '${catagory}' not found`
      });
    }
    
    // Upload thumbnail
    const thumbnailResponse = await uploadFiles(thumbnail, process.env.FOLDER_NAME);
    if (!thumbnailResponse.success) {
      return res.status(400).json({
        success: false,
        message: "Error uploading thumbnail",
        error: thumbnailResponse.message
      });
    }
    
    // Create course with optimized data structure
    const courseData = {
      courseName: courseName.trim(),
      courseDescp: courseDescp.trim(),
      whatWillYouLearn: whatWillYouLearn.trim(),
      catagory: catagoryDetail._id,
      catagoryName: catagoryDetail.name,
      instructor: instructorDetail._id,
      price: Number(price),
      thumbnail: thumbnailResponse.data.secure_url,
      courseTag: parsedCourseTags,
      status,
      courseContent: [], // Initialize empty array
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const newCourse = await courseModel.create([courseData], { session });
    
    // Update instructor's courses array
    const updatedUser = await userModel.findByIdAndUpdate(
      instructorDetail._id,
      { $push: { courses: newCourse[0]._id } },
      { new: true, session }
    ).select('courses');
    
    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "Failed to update instructor's course list"
      });
    }
    
    // Commit transaction
    await session.commitTransaction();
    
    // Return success response with minimal data
    return res.status(201).json({
      success: true,
      message: "Course created successfully",
      data: {
        courseId: newCourse[0]._id,
        courseName: newCourse[0].courseName,
        status: newCourse[0].status,
        thumbnail: newCourse[0].thumbnail,
        createdAt: newCourse[0].createdAt
      }
    });
    
  } catch (error) {
    // Rollback transaction on error
    await session.abortTransaction();
    
    console.error("Error creating course:", {
      error: error.message,
      stack: error.stack,
      userId: req.user?.id,
      timestamp: new Date().toISOString()
    });
    
    // Handle specific error types
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: Object.values(error.errors).map(err => err.message)
      });
    }
    
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Course with this name already exists"
      });
    }
    
    return res.status(500).json({
      success: false,
      message: "Internal server error while creating course",
      error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
    });
    
  } finally {
    // Always end the session
    await session.endSession();
  }
};

exports.deleteCourseHandler = async (req, res) => {
  try {
    console.log("Req.body=>", req.body);
    console.log("Req.user=>", req.user);

    const userId = req.user.id;
    const courseID = req.body.id; // Correct course ID from request body

    if (!courseID) {
      return res.status(400).json({
        success: false,
        message: "Course ID not found (Can't delete course)"
      });
    }

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID not found (Can't delete course)"
      });
    }

    // Delete the course from the courseModel
    const updatedCourse = await courseModel.findByIdAndDelete(courseID, { new: true });
    console.log("Delete course Response => ", updatedCourse);

    if (!updatedCourse) {
      return res.status(404).json({
        success: false,
        message: "Course not found or already deleted"
      });
    }

    // Remove the course from the user's courses array
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { $pull: { courses: courseID } },  // Remove course from user courses array
      { new: true }
    ).populate('courses');
    console.log("Delete course from UserModel Response => ", updatedUser);

    return res.status(200).json({
      success: true,
      message: "Successfully Deleted Course",
      data: updatedUser.courses
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
      error: error
    });
  }
};


exports.editCourseHandler = async (req, res) => {
  try {
    console.log("edit course BODY request=>", req.body);
    console.log("edit course FILES request=>", req?.files);

    const { courseName, courseDescp, whatWillYouLearn, price,status, catagory, courseTag, id } = req.body;
    let thumbnail = req.body.thumbnail;

    let parsedCourseTags = [];
    try {
      parsedCourseTags = courseTag ? JSON.parse(courseTag) : [];
    } catch (err) {
      console.warn("Failed to parse courseTags, using empty array:", err);
    }

    if (!courseName || !courseDescp || !whatWillYouLearn || !price || !catagory || !id) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    const userId = req.user.id;

    const instructorDetail = await userModel.findById(userId);
    if (!instructorDetail) {
      return res.status(404).json({
        success: false,
        message: "Instructor not found"
      });
    }

    const catagoryDetail = await catagoryModel.findOne({ name: catagory });
    if (!catagoryDetail) {
      return res.status(404).json({
        success: false,
        message: "Category not found"
      });
    }

    // Handle new thumbnail upload if provided
    if (req.files && req.files.thumbnail) {
      const thumbnailResponse = await uploadFiles(req.files.thumbnail, process.env.FOLDER_NAME);
      if (!thumbnailResponse.success) {
        return res.status(400).json({
          success: false,
          message: "Error uploading thumbnail",
          error: thumbnailResponse.message
        });
      }
      thumbnail = thumbnailResponse.data.secure_url;
    }

    // Update course with new data
    const updatedCourse = await courseModel.findByIdAndUpdate(
      id,
      {
        courseName,
        courseDescp,
        whatWillYouLearn,
        catagory: catagoryDetail._id,
        catagoryName: catagoryDetail.name,
        instructor: instructorDetail._id,
        price,
        thumbnail,
        status,
        courseTag:parsedCourseTags
      },
      { new: true }
    );

    if (!updatedCourse) {
      return res.status(404).json({
        success: false,
        message: "Course not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Course edited successfully",
      data: updatedCourse
    });
    
  } catch (error) {
    console.error("Error while Editing course:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while editing the course",
      error: error.message
    });
  }
};

exports.addCourseStatusHandler = async (req, res) => {
  try {
    let { status, courseId } = req.body; // Assuming courseId is sent in the request body

    console.log("addCourse status req.body => ", status, courseId);

    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: "Course ID is required",
      });
    }

    // Convert boolean status to string value
    if (status === 'true') {
      status = "Published";
    } else {
      status = "Draft";
    }

    // Update course status using course ID
    const response = await courseModel.findByIdAndUpdate(
      { _id: courseId }, // Use the correct course ID here
      { status },
      { new: true } // Return the updated course document
    );

    if (!response) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    console.log("addCourse status response => ", response);

    return res.status(200).json({
      success: true,
      message: "Status updated successfully",
      data: response,
    });

  } catch (error) {
    console.error("Error while updating course status:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while updating the course status",
      error: error.message,
    });
  }
};



exports.getCourseDetails=async(req,res)=>{
  try {
    console.log(" getCourseDetails Request.body => ",req.body)
    const id=req.body.courseId
    const courseDetails=await courseModel.findById({_id:id})
      .populate({
        path: "courseContent", 
        populate: {
          path: "subSection",
          model: "subSectionModel",
        },
      });
    return res.status(200).json({
      success:true,
      message:`All course fetched successFully `,
      data:courseDetails
    })
  } catch (error) {
    return res.status(403).json({
      success:false,
      message:`Unable to ferch the data of all courses due to error `,
      error:error,
      error1:error.message
    })
  }
}



exports.getAllCourseDetails=async(req,res)=>{
  try {
    console.log(" getCourseDetails Request.body => ",req.user)
    const id=req.user.id
    const allCoureDetails=await userModel.findById(id).populate('courses');
    console.log("allCoureDetails=>",allCoureDetails.courses)
    return res.status(200).json({
      success:true,
      message:`All course fetched successFully `,
      // data:req.body,
      data:allCoureDetails.courses
    })
  } catch (error) {
    return res.status(403).json({
      success:false,
      message:`Unable to ferch the data of all courses due to error `,
      error:error,
      error1:error.message
    })
  }
}



exports.getCourseByCatagoryHandler=async(req,res)=>{
  try {
    const {catagoryName}=req.body
    const courseByCatagoriesResponse=await courseModel.find({catagoryName:catagoryName})

    if(courseByCatagoriesResponse.length===0){
      console.log("Courses are Not avilable for this catagory")
      return res.status(200).json({
        success:false,
        message:`Courses are Not avilable for ${catagoryName} catagory`
      })
    }

    console.log("courseByCatagories Response => ",courseByCatagoriesResponse)

    return res.status(200).json({
      success:true,
      data:courseByCatagoriesResponse,
      message:`All Catagory Displayed SuccessFully`
    })

  } catch (error) {
    return res.status(500).json({
      success:false,
      message:`Failed To Show All Caragory because of ERROR => ${error}`
    })
  }
}
