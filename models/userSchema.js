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
    passwordUpdatedAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

userSchema.index({ firstName: 1, email: 1 });

userSchema.methods.getJWT = async function () {
  const user = this;
  const signJWT = await jwt.sign(
    { id: user.id, passwordUpdatedAt: user.passwordUpdatedAt },
    "MySecretKey619916",
    {
      expiresIn: "1h",
    }
  );

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

userSchema.pre("save", function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.passwordUpdatedAt = Date.now();
  }
});

const User = mongoose.model("User", userSchema);

module.exports = {
  User,
};
