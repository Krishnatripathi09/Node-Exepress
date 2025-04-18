const jwt = require("jsonwebtoken");
const { User } = require("../models/userSchema");
const userAuth = async (req, res, next) => {
  const { token } = req.cookies;

  const decodedMSG = await jwt.verify(token, "MySecretKey619916");

  const { id } = decodedMSG;

  const user = await User.findById(id);

  if (!user) {
    res.status(404).send("User Not Found");
  }

  req.user = user;
  next();
};

module.exports = {
  userAuth,
};
