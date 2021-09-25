const express = require("express");
const router = new express.Router();
const {
  createStudent,
  findStudent,
  findStudentById,
  updateStudentById,
  deleteStudentById,
  uploadProfilepic,
  displayPic,
} = require("../controllers/students");

//create the student registration
router.post("/student", createStudent);

//Get all Students
router.get("/students", findStudent);

//Get Student by id
router.get("/student/:studentId", findStudentById);

//update the Student
router.put("/student/update/:studentId", updateStudentById);

//delete the Student
router.delete("/student/delete/:studentId", deleteStudentById);

//upload the Profilepic of Student
router.post("/student/upload", uploadProfilepic);

//fetch profile photo of Student
router.get("/student/profile/:profilePic", displayPic);

module.exports = router;
