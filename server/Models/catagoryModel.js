const mongoose=require('mongoose');

const catagorySchema=new mongoose.Schema(
  {
    name:{
      type:String,
      required:true
    },
    descp:{
      type:String,
      required:true
    },
    course:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"courseModel"
    },
  }
);


module.exports=mongoose.model('catagoryModel',catagorySchema);