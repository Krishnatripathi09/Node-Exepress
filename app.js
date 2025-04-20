const express = require("express");
const connectDB = require("./config/database.js");
const { User } = require("./models/userSchema.js");
const { validateSignUpData } = require("./utils/validation.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cookieparser = require("cookie-parser");
const { userAuth } = require("./middlewares/userAuth.js");
const profileRouter = require("./routes/profile.js");
const authRouter = require("./routes/auth.js");

const app = express();
const PORT = 3000;

app.use(cookieparser());
app.use(express.json());

app.use("/", profileRouter);
app.use("/", authRouter);

connectDB()
  .then(() => {
    console.log("Connected to DataBase SuccessFully");
    app.listen(PORT, () => {
      console.log(`Server is running On Port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
