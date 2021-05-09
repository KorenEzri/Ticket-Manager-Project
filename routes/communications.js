const { Router } = require("express");
const Ticket = require("../mongo/models/ticket");
const User = require("../mongo/models/user");
const communications = Router();
const ValidationKey = require("../mongo/models/company-validation");
const nodemailer = require("nodemailer");
const { nanoid } = require("nanoid");
const saltRounds = 10;
const PASS = process.env.EMAILPWD;
let initialValidationKey;

const sendMail = async (message, validator) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "noreplybarbieshhhhh@gmail.com",
      pass: `${PASS}`,
    },
  });
  if (!validator) {
    const info = await transporter.sendMail({
      from: "Ko-Manage, ticket-system, inc.",
      to: `${message.userEmail}`,
      subject: `${message.title}`,
      text: `Content: ${message.content}, Done: ${message.done}, Labels: ${message.labels}, Date created: ${message.creationTime}, Last updated: ${message.lastUpdated}`,
    });
    console.log("Message sent: %s", info.messageId);
  } else {
    const info = await transporter.sendMail({
      from: "Ko-Manage, ticket-system, inc.",
      to: `${message.userEmail}`,
      subject: `${message.title}`,
      text: `${message.content}`,
    });
    console.log("Message sent: %s", info.messageId);
  }
};

communications.post("/", async (req, res) => {
  const {
    data = {
      content,
      correspondences,
      done,
      userEmail,
      labels,
      title,
      creationTime,
      lastUpdated,
    },
  } = req.body;
  await Ticket.updateOne({ title: data.title }, data);
  const allTickets = await Ticket.find({});
  sendMail(data);
  res.status(200).send(allTickets);
});

communications.put("/requestvalidation", async (req, res) => {
  const { username } = req.body;
  const foundUser = await User.findOne({ username: username });
  if (foundUser) {
    const message = {
      userEmail: "cyber4sdummyaddress@gmail.com",
      title: "Your company validation key",
      content: `Hello. The following is your company validation key for the user ${username}. The key will be valid for fifteen minutes. Please do not share or expose your key in any way. \n \n${initialValidationKey}
    Best regards, \n 
    Ko-manage`,
    };
    sendMail(message, "true");
    res.status(200).send("OK");
  } else {
    res.status(400).send("There was a problem processing the request.");
  }
});

module.exports = communications;
