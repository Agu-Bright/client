const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true, "please Enter your userName"],
  },
  password: {
    type: String,
    required: [true, "please Enter your password"],
  },
});

//Encrypting password

module.exports = mongoose.model("User", userSchema);
