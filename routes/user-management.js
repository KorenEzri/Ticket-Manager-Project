const { Router } = require("express");
const User = require("../mongo/models/user");
const ValidationKey = require("../mongo/models/company-validation");
const userManagement = Router();
const helmet = require("helmet");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");

userManagement.use(helmet());
userManagement.use(bodyParser.urlencoded({ extended: false }));

userManagement.post("/register", async (req, res) => {
  const saltRounds = 10;
  const { firstName, lastName, username, birthday, lastLogin } = req.body;
  let { password } = req.body;
  try {
    bcrypt.hash(password, saltRounds, async function (err, hash) {
      if (err) {
        console.error(err);
        return res.status(400).json({ success: false });
      } else {
        password = hash;
        const user = new User({
          firstName,
          lastName,
          username,
          password,
          birthday,
        });
        console.log(user);
        await user.save();
        res.redirect("/");
      }
    });
  } catch ({ message }) {
    console.log(message);
    res.status(500).send(`Internal server error, ${message}`);
  }
});

userManagement.put("/login", async (req, res) => {
  console.log("ASD");
  try {
    let companyValidated = false;
    const { username, password, validation } = req.body;
    const attemptData = await ValidationKey.findOne({ username: username });
    const companyHash = attemptData.key;
    await bcrypt.compare(validation, companyHash, async function (err, result) {
      if (result == true) {
        companyValidated = true;
      } else if (result == false) {
        res.status(400).json({ message: `user not found` });
      }
    });
    const findUser = await User.findOne({ username: username });
    const passwordHash = findUser.password;
    await bcrypt.compare(password, passwordHash, async function (err, result) {
      if (result == true && companyValidated) {
        console.log("VALIDATED?");
        res.redirect("/");
      } else if (result == false) {
        res.status(400).json({ message: `user not found` });
      }
    });
  } catch (error) {
    console.error(error);
  }
});

module.exports = userManagement;
