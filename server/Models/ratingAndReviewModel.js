const mongoose=require('mongoose');

const ratingAndReviewSchema=new mongoose.Schema(
  {
    user:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"userModel",
      required:true
    },
    rating:{
      type:String,
    },
    review:{
      type:String,
    }
  }
);


module.exports=mongoose.model('ratingAndReviewModel',ratingAndReviewSchema);