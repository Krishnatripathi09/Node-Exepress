const express = require("express");
const { User } = require("../models/userSchema");
const bcrypt = require("bcrypt");

const authRouter = express.Router();

authRouter.post("/user", async (req, res) => {
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

authRouter.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).send("Please Enter valid Email And Password");
  }

  const validPassword = await user.verifyPWD(password);

  const id = user.id;
  if (validPassword) {
    const token = await user.getJWT();

    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 9 * 3600000),
    });
    return res.status(200).send("Login Successfull");
  } else {
    res.status(400).send("Please Enter Valid Credentials");
  }
});

module.exports =  authRouter

