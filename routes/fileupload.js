const multer = require("multer");
const express = require("express");
const path = require("path");
const fileUpload = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

fileUpload.post("/file", upload.single("file"), (req, res) => {
  try {
    res.send("File Uploaded SuccessFully");
  } catch (err) {
    console.log(err);
  }
});

module.exports = {
  fileUpload,
};
