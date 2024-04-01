const express = require("express");
const router = express.Router();
// Import the Controllers
//Course Controllers import
const {
  createCourse,
  showAllCourses,
  getCourseDetails,
} = require("../controllers/Course");
//Categories controllers Import
const {
  createCategory,
  getAllCategorys,
  categoryPageDetails,
} = require("../controllers/Category");
//Sections controllers import
const {
  createSection,
  updatSection,
  deleteSection,
} = require("../controllers/Section");
//Sub-section Controllers import
const {
  createSubSection,
  updateSubSection,
  deleteSubSection,
} = require("../controllers/SubSection");

// Rating Controller Import
const {
  createRating,
  getAverageRating,
  getAllRatingAndReviews,
} = require("../controllers/RatingAndReview");
//Import Middlewares
const {
  auth,
  isStudent,
  isInstructor,
  isAdmin,
} = require("../middlewares/auth");


// adding routes
router.post("/createCourse",auth,isInstructor,createCourse);
router.post("/addSection",auth,isInstructor,createSection);
router.post("/updateSection",auth,isInstructor,updatSection);
router.post("deleteSection",auth,isInstructor,deleteSection);
router.post("/updateSubSection", auth, isInstructor, updateSubSection);
// Delete Sub Section
router.post("/deleteSubSection", auth, isInstructor, deleteSubSection);
// Add a Sub Section to a Section
router.post("/addSubSection", auth, isInstructor, createSubSection);
// Get all Registered Courses
router.get("/getAllCourses", showAllCourses);
// Get Details for a Specific Courses
router.post("/getCourseDetails", getCourseDetails);

// ********************************************************************************************************
//                                      Category routes (Only by Admin)
// ********************************************************************************************************
// Category can Only be Created by Admin
// TODO: Put IsAdmin Middleware here
router.post("/createCategory", auth, isAdmin, createCategory);
router.get("/showAllCategories", getAllCategorys);
router.post("/getCategoryPageDetails", categoryPageDetails);

// ********************************************************************************************************
//                                      Rating and Review
// ********************************************************************************************************
router.post("/createRating", auth, isStudent, createRating);
router.get("/getAverageRating", getAverageRating);
router.get("/getReviews", getAllRatingAndReviews);

module.exports = router;
