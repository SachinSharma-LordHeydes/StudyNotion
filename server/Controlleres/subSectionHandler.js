const courseModel = require("../Models/courseModel");
const sectionModel = require("../Models/sectionModel");
const subSectionModel = require("../Models/subSectionModel");
const { uploadFiles } = require("../utils/fileUploader");

require("dotenv").config();



exports.createSubSectionHandler = async (req, res) => {
  try {
    const { title, description, id, courseId } = req.body;

    console.log("req.body=> ",req.body);
    console.log("req.diles=> ",req.files);

    const {video} = req.files

    const validObjectId = id.replace(':', '');

    if (!title || !id || !description || !courseId) {
      return res.status(403).json({
        success: false,
        message: "Required fields are missing"
      });
    }

    if(!video){
      return res.status(400).json({
        success: false,
        message: "no video file from frontend to backend",
      });
    }
 
    console.log("Video Path=> ",video) 

    const videoResponse = await uploadFiles(video, process.env.FOLDER_NAME);
    if (!videoResponse) {
      return res.status(400).json({
        success: false,
        message: "Error uploading thumbnail",
      });
    }

    console.log("Video Response=> ",videoResponse.data.secure_url)

    const newSubSection = await subSectionModel.create({
      title,
      description,
      videoURL:videoResponse.data.secure_url 
    });

    const updatedSection = await sectionModel.findByIdAndUpdate(
      validObjectId,
      {
        $push: {
          subSection: newSubSection._id
        }
      },
      { new: true }
    )
    .populate({
      path: 'subSection',  // Populate subSection with details
      select: 'title description videoURL'  // Select only the needed fields
    });


    const updatedCourse = await courseModel.findById(courseId).populate({
      path: 'courseContent', // Populate courseContent which contains sectionModel data
      populate: {
        path: 'subSection', // Inside each section, populate subSection which contains subSectionModel data
        select: 'title description videoURL' // Select specific fields from subSection
      }
    })

    return res.status(200).json({
      success: true,
      message: "Sub-Section Created Successfully",
      data: updatedCourse  // Now includes all populated details
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Unable to create Sub-Section`,
      error
    });
  }
};




exports.getSubSectionHandler=async(req,res)=>{
  try {

    const {id}=req.body;
    console.log("get subsection req.bofy=> ",req.body)
    if(!id){
      return res.status(403).json({
        success:true,
        message:`Id of The User is Not Present ro get SubSection Data`
      })
    }

    const subSectionData= await subSectionModel.findById(id)
    return res.status(200).json({
      success:true,
      message:"SubSection Data Fetched Successfully",
      data:subSectionData
    })
    
  } catch (error) {
    return res.status(500).json({
      success:false,
      message:`Unable to Fetch SubSection data because of ERROR`,
      error:error
    })
  }
}

// exports.updateSubSection = async (req, res) => {
//   try {
//     const {  title, description,subSectionID, courseId } = req.body;
//     console.log("requect .body update Subsection======> ",req.body)

//     const {video} = req.files || req.body;

//     let isVideoFromBody=false;

//     console.log("Video Path=> ",video)

//     let videoResponse;

//     if(req.files.video){
//       console.log("Video Obtain From req.file")
//     } 
//     if(req.body.video){
//       console.log("Video Obtain From req.body")
//       isVideoFromBody=true;
//     }
    
//     if(video && !isVideoFromBody){
//       videoResponse = await uploadFiles(video, process.env.FOLDER_NAME);
//       if (!videoResponse) {
//       return res.status(400).json({
//         success: false,
//         message: "Error uploading thumbnail",
//       });
//     }

//     }

//     const updatedSubSection = await subSectionModel.findByIdAndUpdate(
//       subSectionID,
//       {
//         title,
//         description,
//         videoURL:isVideoFromBody?videoResponse.data.secure_url:video
//       },
//       { new: true }
//     );


//     // Get the updated course data with populated sub-sections
//     const updatedCourse = await courseModel.findById(courseId)
//       .populate({
//         path: 'courseContent',
//         populate: {
//           path: 'subSection',
//           model: 'subSectionModel',
//           select: 'title description videoURL'
//         }
//       });

//     return res.status(200).json({
//       success: true,
//       message: "SubSection Updated Successfully",
//       data: updatedCourse
//     });

//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: `Unable to update SubSection due to ERROR`,
//       error: error.message
//     });
//   }
// };


exports.updateSubSection = async (req, res) => {
  try {
    const { title, description, subSectionID, courseId } = req.body;

    console.log("Request body for updateSubSection: ", req.body);

    if (!subSectionID || !courseId || !title || !description) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    let video;
    let isVideoFromBody = false;
    let videoResponse;

    if (req.files?.video) {
      video = req.files.video;
      console.log("Video obtained from req.files");
    }

    // Check for video in req.body
    if (req.body.video) {
      video = req.body.video;
      isVideoFromBody = true;
      console.log("Video obtained from req.body");
    }

    if (video && !isVideoFromBody) {
      videoResponse = await uploadFiles(video, process.env.FOLDER_NAME);
      if (!videoResponse) {
        return res.status(400).json({
          success: false,
          message: "Error uploading video",
        });
      }
    }

    const updatedSubSection = await subSectionModel.findByIdAndUpdate(
      subSectionID,
      {
        title,
        description,
        videoURL: isVideoFromBody ? video : videoResponse?.data?.secure_url || "",
      },
      { new: true }
    );

    if (!updatedSubSection) {
      return res.status(404).json({
        success: false,
        message: "SubSection not found",
      });
    }

    const updatedCourse = await courseModel.findById(courseId,{ new: true }).populate({
      path: 'courseContent',
      populate: {
        path: 'subSection',
        model: 'subSectionModel',
        select: 'title description videoURL',
      },
    });

    return res.status(200).json({
      success: true,
      message: "SubSection updated successfully",
      data: updatedCourse,
    });
  } catch (error) {
    console.error("Error updating SubSection: ", error);
    return res.status(500).json({
      success: false,
      message: "Unable to update SubSection due to an error",
      error: error.message,
    });
  }
};



exports.deleteSubSection = async (req, res) => {
  try {
    const { id, courseId, sectionId } = req.body;

    console.log("Sub-Section ID: ", id);
    console.log("Section ID: ", sectionId);
    console.log("Course ID: ", courseId);

    if (!id) {
      return res.status(403).json({
        success: false,
        message: `SubSection ID is not provided`
      });
    }

    // Remove the subsection from the section
    const updatedSection = await sectionModel.findByIdAndUpdate(
      sectionId,
      {
        $pull: { subSection: id }  // Remove the sub-section reference from the section
      },
      { new: true }
    );

    // Delete the sub-section document
    const deletedSubSection = await subSectionModel.findByIdAndDelete(id);

    if (!deletedSubSection) {
      return res.status(404).json({
        success: false,
        message: 'SubSection not found'
      });
    }

    // Get the updated course data after deleting the sub-section
    const updatedCourse = await courseModel.findById(courseId)
      .populate({
        path: 'courseContent',
        populate: {
          path: 'subSection',
          model: 'subSectionModel',
          select: 'title description videoURL'
        }
      });

    return res.status(200).json({
      success: true,
      message: "SubSection Deleted Successfully",
      data: updatedCourse
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Unable to delete SubSection due to ERROR`,
      error: error.message
    });
  }
};
