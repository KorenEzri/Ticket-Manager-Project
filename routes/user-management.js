const { Router } = require("express");
const User = require("../mongo/models/user");
const userManagement = Router();
const helmet = require("helmet");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
let validated = false;

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
  try {
    let companyHash;
    const { username, password, validation } = req.body;
    if (validated) {
      companyHash = validation;
    } else {
      companyHash = await bcrypt.compare( // REQUEST HASH FROM JSONBIN
        validation,
        companyHash,
        async function (err, result) {
          if (result == true) {
            res.status(200).send("validated");
          } else if (result == false) {
            res.status(400).json({ message: `user not found` });
          }
        }
      );
    }
  } catch (error) {
    console.error(error);
  }
});

module.exports = userManagement;
