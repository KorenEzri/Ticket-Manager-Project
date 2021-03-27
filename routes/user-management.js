const { Router } = require("express");
const User = require("../mongo/models/user");
const userManagement = Router();
const helmet = require("helmet");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");

userManagement.use(helmet());
userManagement.use(bodyParser.urlencoded({ extended: false }));

userManagement.post("/register", async (req, res) => {
  console.log(req.body);
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
        await user.save();
        res.status(200).send(user);
      }
    });
  } catch ({ message }) {
    console.log(message);
  }
});

module.exports = userManagement;
