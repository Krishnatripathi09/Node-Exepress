const express = require("express");
const connectDB = require("./config/database.js");
const { User } = require("./models/userSchema.js");
const { validateSignUpData } = require("./utils/validation.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const app = express();
const PORT = 3000;

app.use(express.json());
app.post("/user", async (req, res) => {
  validateSignUpData(req, res);
  const { firstName, lastName, email, password } = req.body;

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User({
    firstName,
    lastName,
    email,
    password: passwordHash,
  });

  await user.save();

  res.send("User Created Successfully");
});

app.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).send("Please Enter valid Email or Password");
  }

  const validPassword = await bcrypt.compare(password, user.password);

  const id = user.id;
  if (validPassword) {
    const token = await jwt.sign({ id }, "MySecretKey619916");
    res.cookie("token", token);
    return res.status(200).send("Login Successfull");
  } else {
    res.status(400).send("Please Enter Valid Credentials");
  }
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
