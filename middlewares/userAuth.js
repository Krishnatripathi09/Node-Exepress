//const express = require("express");
const userAuth = (req, res, next) => {
  const token = "XYZ";

  const isUserAuthorized = token === "ABC";

  if (!isUserAuthorized) {
    res.status(401).send("user Unauthorized! Please Log-In Again");
  } else {
    next();
  }
};

module.exports = {
  userAuth,
};
