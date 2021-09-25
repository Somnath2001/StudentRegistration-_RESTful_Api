const express = require("express");
const router = new express.Router();
const {
  createStudent,
  findStudent,
  findStudentById,
  updateStudentById,
  deleteStudentById,
  studregister,
  displayPic,
} = require("../controllers/students");

//Get all Students
router.get("/students", findStudent);

//Get Student by id
router.get("/student/:studentId", findStudentById);

//update the Student
router.put("/student/update/:studentId", updateStudentById);

//delete the Student
router.delete("/student/delete/:studentId", deleteStudentById);

//create the student registration with profilepic
router.post("/student/register", studregister);

//fetch profile photo of Student
router.get("/student/profile/:profilePic", displayPic);

module.exports = router;
