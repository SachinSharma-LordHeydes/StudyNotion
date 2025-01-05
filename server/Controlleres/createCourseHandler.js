const userModel = require("../Models/userModel");
const courseModel = require("../Models/courseModel");
const catagoryModel = require("../Models/catagoryModel");
const { uploadFiles } = require("../utils/fileUploader");
const sectionModel = require("../Models/sectionModel");

exports.createCourseHandler = async (req, res) => {
  try {
    let { courseName, courseDescp, whatWillYouLearn, price, catagory, status,courseTag } = req.body;
    // courseTag = JSON.parse(courseTag);
    let parsedCourseTags = [];
    try {
      parsedCourseTags = courseTag ? JSON.parse(courseTag) : [];
    } catch (err) {
      console.warn("Failed to parse courseTags, using empty array:", err);
    }
    console.log("courseTag of create course => ",parsedCourseTags)
    
    if (!req.files || !req.files.thumbnail) {
      return res.status(400).json({
        success: false,
        message: "Thumbnail file is required"
      });
    }

    const thumbnail = req.files.thumbnail;

    if (!courseName || !courseDescp || !whatWillYouLearn || !price || !thumbnail || !catagory) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    if (!status || status === undefined) {
      status = "Draft"
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

    const thumbnailResponse = await uploadFiles(thumbnail, process.env.FOLDER_NAME);
    if (!thumbnailResponse.success) {
      return res.status(400).json({
        success: false,
        message: "Error uploading thumbnail",
        error: thumbnailResponse.message
      });
    }

    const newCourse = await courseModel.create({
      courseName,
      courseDescp,
      whatWillYouLearn,
      catagory: catagoryDetail._id,
      catagoryName: catagoryDetail.name,
      instructor: instructorDetail._id,
      price,
      thumbnail: thumbnailResponse.data.secure_url,
      courseTag:parsedCourseTags
    });

    const updatedUser = await userModel.findByIdAndUpdate(
      instructorDetail._id,
      {
        $push: { courses: newCourse._id }
      },
      { new: true }
    );

    return res.status(201).json({
      success: true,
      message: "Course created successfully",
      data: newCourse
    });

  } catch (error) {
    console.error("Error creating course:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while creating the course",
      error: error.message
    });
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
