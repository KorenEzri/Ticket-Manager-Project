const { Router } = require("express");
const User = require("../mongo/models/user");
const Cookie = require("../mongo/models/cookie");
const ValidationKey = require("../mongo/models/company-validation");
const userManagement = Router();
const helmet = require("helmet");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
let isValidated = false;

userManagement.use(cookieParser());
userManagement.use(helmet());
userManagement.use(bodyParser.urlencoded({ extended: false }));

userManagement.post("/register", async (req, res) => {
  const saltRounds = 10;
  const { firstName, lastName, username } = req.body;
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
        });
        console.log(user);
        await user.save();
        res.redirect("/login");
      }
    });
  } catch ({ message }) {
    console.log(message);
    res.status(500).send(`Internal server error, ${message}`);
  }
});

userManagement.post("/login", async (req, res) => {
  try {
    let companyValidated = false;
    const { username, password, validation } = req.body;
    const attemptData = await ValidationKey.findOne({ username: username });
    const companyHash = attemptData.key;
    await bcrypt.compare(validation, companyHash, async function (err, result) {
      if (result == true) {
        console.log("Key validated successfully.");
        isValidated = true;
        companyValidated = true;
      } else if (result == false) {
        res.status(400).json({ message: `user not found` });
      }
    });
    const findUser = await User.findOne({ username: username });
    const passwordHash = findUser.password;
    await bcrypt.compare(password, passwordHash, async function (err, result) {
      if (result == true && companyValidated) {
        const cookieName = "loggedIn";
        const cookie = req.cookies.cookieName;
        const random = Math.floor(Math.random() * 121);
        if (!cookie && isValidated) {
          res.cookie(cookieName, random, {
            maxAge: 2200000,
            httpOnly: false,
          });
          const newCookie = new Cookie({
            cookie: "loggedIn",
            value: random,
          });
          try {
            await Cookie.deleteOne({ cookie: "loggedIn" });
            await newCookie.save();
          } catch ({ message }) {
            console.log(message);
          }
        } else {
          console.log("cookie exists", cookie);
        }
        res.redirect("/");
      } else if (result == false) {
        res.status(400).json({ message: `user not found` });
      }
    });
  } catch (error) {
    console.error(error);
  }
});

userManagement.get("/:cookieData", (req, res) => {
  const cookieValue = req.params.cookie;
  const currentCookie = Cookie.findOne({ cookie: "loggedIn" });
  if (currentCookie && currentCookie.value === cookieValue) {
    res.status(200).send(true);
  } else {
    res.status(400).send(false);
  }
});

module.exports = userManagement;
