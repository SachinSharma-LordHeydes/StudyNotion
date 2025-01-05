const mongoose=require('mongoose');

const profileSchema=new mongoose.Schema(
  {
    gender:{
      type:String,
      enum:['Male',"Female","Others"]
    },
    DOB:{
      type:String,
    },
    about:{
      type:String,
    },
    contactNum:{
      type:Number,
    }
  }
);


module.exports=mongoose.model('profileModel',profileSchema);