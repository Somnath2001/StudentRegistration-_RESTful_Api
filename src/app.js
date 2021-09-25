const express = require("express");
require("./db/connection");
const StudentRoute = require("./routes/students");
const app = express();

//middleware
app.use(express.json());

//student Route
app.use("/api", StudentRoute);

//port
const port = process.env.PORT || 8081;

//starting a server
app.listen(port, () => {
  console.log(`Server is connecting on port ${port}`);
});
