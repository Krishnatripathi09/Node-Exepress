const express = require("express");
const { fileRouter } = require("./fileUpload/fileUpload");

const app = express();

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running On Port ${PORT}`);
});

app.use("/", fileRouter);
