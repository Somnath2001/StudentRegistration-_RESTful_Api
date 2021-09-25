require("dotenv").config();
const mongoose = require("mongoose");

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connection successful with database");
  })
  .catch((error) => {
    console.log(error);
  });
