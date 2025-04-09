const express = require("express");
const { userAuth } = require("./middlewares/userAuth");

const app = express();

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running On Port ${PORT}`);
});

app.get("/user/data", userAuth, (req, res) => {
  res.send("I am user data ");
});
