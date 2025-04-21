const validator = require("validator");

const validateSignUpData = (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName) {
    res.status(400).send("Please Enter first and Last Name ");
  } else if (firstName.length < 4 || firstName.length > 30) {
    res.status(400).send("First Name should be between 4 and 30 characters");
  } else if (lastName.length < 4 || lastName.length > 30) {
    res.status(400).send("LastName should be between 3 and 30 Characters");
  } else if (!validator.isEmail(email)) {
    res.status(400).send("Please Enter Valid Email");
  } else if (!validator.isStrongPassword(password)) {
    res.status(400).send("Password should be at least 8 characters");
  }
};

const validateEditProfileData = (req, res) => {
  const allowedFields = ["firstName", "lastName"];
  const isEditAllowed = Object.keys(req.body).every((field) =>
    allowedFields.includes(field)
  );

  return isEditAllowed;
};

module.exports = {
  validateSignUpData,
  validateEditProfileData,
};
