const express = require("express");
const { userAuth } = require("../middlewares/userAuth");
const { validateEditProfileData } = require("../utils/validation.js");
const { User } = require("../models/userSchema.js");
const bcrypt = require("bcrypt");
const validator = require("validator");

const profileRouter = express.Router();

profileRouter.get("/user", userAuth, async (req, res) => {
  const loggedInUser = req.user;

  const user = await User.findById(loggedInUser.id).select(
    "firstName lastName email"
  );
  res.send("Users Found : " + user);
});

profileRouter.get("/alluser", userAuth, async (req, res) => {
  const loggedInUser = req.user;

  const users = await User.find({}).select("firstName lastName email");
  res.status(200).send("Found Users =>" + users);
});

profileRouter.patch("/editprofile", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      res.status(403).send(`Edit Allowed Only on First and Last Name`);
    }

    const loggedInUser = req.user;

    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

    await loggedInUser.save();
    res.status(200).send("User Updated SuccessFully");
  } catch (err) {
    console.log(err);
  }
});

profileRouter.patch("/updatepassword", userAuth, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      res.status(400).send("Both old and new Passwords are required");
    }

    if (oldPassword === newPassword) {
      res.status(400).send("Old and NewPasswords cannot be same");
    }

    if (!validator.isStrongPassword(newPassword)) {
      res.status(400).send("Please Enter Strong new Password");
    }

    const loggedInUser = req.user;

    const isValidPassword = await bcrypt.compare(
      oldPassword,
      loggedInUser.password
    );

    if (isValidPassword) {
      const passwordHash = await bcrypt.hash(newPassword, 10);
      loggedInUser.password = passwordHash;
      loggedInUser.passwordUpdatedAt = new Date();
      await loggedInUser.save();
      res.status(200).send("Password Updated SuccessFully");
    } else {
      res.status(400).send("Please Enter Valid Old Password");
    }
  } catch (err) {
    console.log(err);
  }
});

profileRouter.delete("/user/delete", userAuth, async (req, res) => {
  const loggedInUser = req.user;

  const deletedUser = await User.deleteOne({ _id: loggedInUser.id });

  res.status(200).send("User Profile Deleted SucessFully", deletedUser);
});

module.exports = profileRouter;
