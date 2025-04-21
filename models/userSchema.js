const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 30,
    },
    lastName: {
      type: String,
      minLength: 4,
      maxLength: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Please Enter Valid Email");
        }
      },
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Please Enter Valid Gender");
        }
      },
    },
  },
  { timestamps: true }
);

userSchema.methods.getJWT = async function () {
  const user = this;
  const signJWT = await jwt.sign({ id: user.id }, "MySecretKey619916", {
    expiresIn: "1h",
  });

  return signJWT;
};

userSchema.methods.verifyPWD = async function (passwordInputByUser) {
  const user = this;

  const passwordHash = user.password;

  const isValidPassword = await bcrypt.compare(
    passwordInputByUser,
    passwordHash
  );

  return isValidPassword;
};

const User = mongoose.model("User", userSchema);

module.exports = {
  User,
};
