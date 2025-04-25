const jwt = require("jsonwebtoken");
const { User } = require("../models/userSchema");
const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).send("User Unauthorized! Please Log-In Again");
    }

    const decodedMSG = await jwt.verify(token, "MySecretKey619916");

    const { id } = decodedMSG;

    const user = await User.findById(id);

    if (!user) {
      res.status(404).send("User Not Found");
    }

    const tokenTime = new Date(decodedMSG.passwordUpdatedAt).getTime();
    const currentTime = new Date(user.passwordUpdatedAt).getTime();

    if (currentTime > tokenTime) {
      res.status(401).send("Please Log-In Again After Updating Password");
    }

    req.user = user;
    next();
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  userAuth,
};
