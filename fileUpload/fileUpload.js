const multer = require("multer");
const express = require("express");

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

fileRouter.post("/upload", upload.single("file"), (req, res) => {
  try {
    res.send("File Uploaded SuccessFully", req.file);
  } catch (err) {
    res.status(400).send("Error Occured :" + err);
  }
});
module.exports = {
  fileRouter,
};
