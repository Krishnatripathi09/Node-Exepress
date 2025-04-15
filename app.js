const express = require("express");
const { userAuth } = require("./middlewares/userAuth");
const connectDB = require("./config/database.js");
const app = express();

const PORT = 3000;

connectDB()
  .then(() => {
    console.log("Connected to DataBase SuccessFully");
    app.listen(PORT, () => {
      console.log(`Server is running On Port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
