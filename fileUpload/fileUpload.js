const multer = require("multer");
const express = require("express");
const path = require("path");

const fileRouter = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },

  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

fileRouter.post("/upload", upload.array("file", 5), (req, res) => {
  try {
    res.status(200).send("File Uploaded SuccessFully");
  } catch (err) {
    res.status(400).send("Error Occured :" + err);
  }
});

module.exports = {
  fileRouter,
};
