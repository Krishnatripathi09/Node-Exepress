const express = require("express");
const connectDB = require("./config/database.js");
const { User } = require("./models/userSchema.js");
const app = express();
const PORT = 3000;

app.post("/user", (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  
});

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
