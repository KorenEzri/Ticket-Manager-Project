const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  username: String,
  password: String,
  birthday: String,
  lastLogin: Date,
});

module.exports = mongoose.model("User", userSchema);
