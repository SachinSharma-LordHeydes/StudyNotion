const courseModel = require("../Models/courseModel");
const sectionModel = require("../Models/sectionModel");
const userModel = require("../Models/userModel");






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

    const { sectionName , id } = req.body;
    const validObjectId = id.replace(':', '');

    if (!sectionName) {
      return res.status(403).json({
        success: false,
        message: "Section Name is Not Present"
      });
    }

    if (!id) {
      return res.status(403).json({
        success: false,
        message: "Id of The Course is Not Present"
      });
    }

    // Await the section creation
    const newSection = await sectionModel.create({
      sectionName
    });

    // Push the section ID into the courseContent array
    const updatedCourse = await courseModel.findByIdAndUpdate(
      validObjectId,
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

    return res.status(200).json({
      success: true,
      message: "Section Created Successfully",
      data: updatedCourse
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Unable to create Section because of `,
      error:error.message
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