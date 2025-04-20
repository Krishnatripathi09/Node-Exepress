const express = require("express");
const { userAuth } = require("../middlewares/userAuth");

const profileRouter = express.Router();

profileRouter.get("/user", userAuth, async (req, res) => {
  const loggedInUser = req.user;

  const user = await User.findById(loggedInUser.id).select(
    "firstName lastName email"
  );

  res.send("Users Found : " + user);
});

module.exports = profileRouter;
