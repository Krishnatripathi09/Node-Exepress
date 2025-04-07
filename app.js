const express = require("express");

const app = express();

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running On Port ${PORT}`);
});

app.use("/user", (req, res) => {
  console.log(req.query.page);
  res.send("This is a User Route");
});
