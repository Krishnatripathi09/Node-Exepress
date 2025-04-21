const express = require("express");
const { userAuth } = require("../middlewares/userAuth");
const { validateEditProfileData } = require("../utils/validation.js");
const { User } = require("../models/userSchema.js");

const profileRouter = express.Router();

profileRouter.get("/user", userAuth, async (req, res) => {
  const loggedInUser = req.user;

  const user = await User.findById(loggedInUser.id).select(
    "firstName lastName email"
  );

  res.send("Users Found : " + user);
});
profileRouter.patch("/editprofile", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      res.status(403).send("Edit Allowed Only on First and Last Name");
    }

    const loggedInUser = req.user;

    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

    await loggedInUser.save();
    res.status(200).send("User Updated SuccessFully");
  } catch (err) {
    console.log(err);
  }
});

module.exports = profileRouter;
