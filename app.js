const express = require("express");
const { userAuth } = require("./middlewares/userAuth");

const app = express();

const PORT = 3000;

app.get("/user", userAuth, (req, res) => {
  res.send("I am user data ");
});

app.post("user/post", (req, res) => {
  console.log("Post The Data Here");
});
app.listen(PORT, () => {
  console.log(`Server is running On Port ${PORT}`);
});
