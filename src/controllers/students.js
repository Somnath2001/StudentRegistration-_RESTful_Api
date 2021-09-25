require("dotenv").config();
const Student = require("../models/students");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const util = require("util");
const mongoose = require("mongoose");
connection = require("../db/connection");

//store new student registration
exports.createStudent = (req, res) => {
  const user = new Student(req.body);
  user
    .save()
    .then(() => {
      res.status(201).send(user);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

//find All the student
exports.findStudent = (req, res) => {
  Student.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
};

//find the student By ID
exports.findStudentById = (req, res) => {
  const _id = req.params.studentId;
  Student.findById(_id)
    .then((data) => {
      if (!data) {
        return res.status(404).send();
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({
        error: "Student not Found",
      });
    });
};

//to update the student
exports.updateStudentById = (req, res) => {
  const _id = req.params.studentId;
  Student.findByIdAndUpdate(_id, req.body, {
    new: true,
  })
    .then((data) => {
      if (!data) {
        return res.status(404).send();
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(404).send({
        error: "Failed to update the Student",
      });
    });
};

//to delete the student
exports.deleteStudentById = (req, res) => {
  const _id = req.params.studentId;
  Student.findByIdAndDelete(_id)
    .then((data) => {
      if (!data) {
        return res.status(400).send();
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(404).send({
        error: "Failed to Delete the Student",
      });
    });
};

//store profilePic to db
var storage = new GridFsStorage({
  url: process.env.DATABASE,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    const match = ["image/png", "image/jpeg"];

    if (match.indexOf(file.mimetype) === -1) {
      const filename = `${Date.now()}profile${file.originalname}`;
      return filename;
    }
    return {
      bucketName: "photos",
      filename: `${Date.now()}profile${file.originalname}`,
    };
  },
});

var uploadFile = multer({ storage: storage }).single("file");
var uploadpic = util.promisify(uploadFile);

exports.uploadProfilepic = async (req, res) => {
  try {
    await uploadpic(req, res);
    console.log(req.file);
    if (req.file == undefined) {
      return res.send(`You must select a file.`);
    }
    return res.send("file has been uploaded");

    // return res.send(`File has been uploaded.`);
  } catch (error) {
    console.log(error);
    return res.send(`Error when trying upload image: ${error}`);
  }
};

//to display the profilePic

exports.displayPic = async (req, res) => {
  const picname = req.params.profilePic;
  const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: "photos",
  });
  bucket.openDownloadStreamByName(picname).pipe(res);
};
