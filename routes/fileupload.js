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

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else cb(new Error("Only JPEG PNG and PDF File Types are Allowed"));
};

const upload = multer({ storage: storage, fileFilter });

fileUpload.post("/file", upload.array("file"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("Please Provide the File to be uploaded");
    }
    res.status(200).send("File Uploaded SuccessFully");
  } catch (err) {
    console.log(err);
  }
});

module.exports = {
  fileUpload,
};
