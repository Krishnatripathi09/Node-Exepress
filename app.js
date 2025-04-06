const express = require("express");

const app = express();

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running On Port ${PORT}`);
});

app.get("/user", (req, res) => {
  res.send("This is a User Route");
});

app.use("/Still", (req, res) => {
  res.send("I am a General Route and Will match all the Path After /");
});
