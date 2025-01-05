const mongoose=require('mongoose');

const courseProgressSchema=new mongoose.Schema(
  {
    courseID:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"courseModel"
    },
    completedVideos:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"subSectionModel"
    }
  }
);


module.exports=mongoose.model('courseProgressModel',courseProgressSchema);