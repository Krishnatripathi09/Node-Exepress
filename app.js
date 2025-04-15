const express = require("express");
const connectDB = require("./config/database.js");
const { User } = require("./models/userSchema.js");
const app = express();
const PORT = 3000;

app.use(express.json());
app.post("/user", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const user = await User({
    firstName,
    lastName,
    email,
    password,
  });

  await user.save();

  res.send("User Created Successfully");
});

app.get("/user", async (req, res) => {
  const user = await User.find({}).select("firstName lastName email");

  res.send("Users Found : " + user);
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
