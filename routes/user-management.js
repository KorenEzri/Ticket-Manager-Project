const { Router } = require("express");
const User = require("../mongo/models/user");
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
  try {
    const { username, password } = req.body;
    const fileData = await netUtils.readBin("users");
    let findUser;
    if (fileData[0].length > 1) {
      findUser = fileData[0].find((user) => user.username === username);
    } else {
      findUser = fileData.find((user) => user.username === username);
    }
    if (!findUser) {
      res.status(200).send("User not found!");
    }
    const hash = findUser.password;
    await bcrypt.compare(password, hash, async function (err, result) {
      if (result == true) {
        const id = findUser.id;
        userFile = await netUtils.readBin(id);
        const user = new controller.User(
          userFile,
          findUser.username,
          findUser.id
        );
        res.status(200).send(JSON.stringify(user));
      } else if (result == false) {
        res.status(400).json({ message: `user not found` });
      }
    });
  } catch (error) {
    console.error(error);
  }
});

module.exports = userManagement;
