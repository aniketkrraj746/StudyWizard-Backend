const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  courseName: {
    type: String,
    trim: true,
  },
  courseDescription: {
    type: String,
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  whatYouWillLearn: {
    type: String,
  },
  courseContent: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Section",
    },
  ],
  ratingAndReviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RatingAndReview",
    },
  ],
  price:{
    type : Number ,
  },
  thumbnail:{
    type : String ,
  },
  category:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",

    },
  ],
  studentsEnrolled:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
  ],
  tag:{
    type:[String],
    required:true,
  },
  status:{
    type:String,
    emum:["Draft","Published"],
  },
  instuctions:{
    type:[String],
  }
  
  
});

module.exports = mongoose.model("Course", courseSchema);
