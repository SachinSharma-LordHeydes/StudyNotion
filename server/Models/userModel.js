const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  accountType: {
    type: String,
    required: true,
    enum: ["Admin", "Student", "Instructor"],
  },
  addDetail: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "profileModel",
  },
  courses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "courseModel",
  }],
  image: {
    type: String,
  },
  cart: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'courseModel'
    }],
    default: []
  },
  courseProgress: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "courseProgressModel",
  }],
  token:{
    type:String
  },
  resetPasswordExpires:{
    type:String
  },
  courseEnrolled:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"courseModel",
  }],
});


// Middleware to delete associated models when the user is deleted
userSchema.pre('deleteOne', { document: true, query: false }, async function(next) {
  const userId = this._id;
  try {
    // Delete the profile related to the user
    if (this.addDetail) {
      await mongoose.model('profileModel').deleteOne({ _id: this.addDetail });
    }

    // Delete the course progress related to the user
    if (this.courseProgress && this.courseProgress.length > 0) {
      await mongoose.model('courseProgressModel').deleteMany({ _id: { $in: this.courseProgress } });
    }

    // Update courses where this user was enrolled
    if (this.courses && this.courses.length > 0) {
      await mongoose.model('courseModel').updateMany(
        { _id: { $in: this.courses } },
        { $pull: { students: userId } }
      );
    }

    console.log("Pre-middleware for user deletion executed successfully");
    next();
  } catch (error) {
    console.error("Error in pre-middleware for user deletion:", error);
    next(error);
  }
});

module.exports = mongoose.model('userModel', userSchema);
