const { Router } = require("express");
const User = require("../mongo/models/user");
const Cookie = require("../mongo/models/cookie");
const ValidationKey = require("../mongo/models/company-validation");
const userManagement = Router();
const helmet = require("helmet");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
let isValidated = false;

userManagement.use(cookieParser());
userManagement.use(helmet());
userManagement.use(bodyParser.urlencoded({ extended: false }));

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
