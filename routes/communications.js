const { Router } = require("express");
const Ticket = require("../mongo/models/ticket");
const communications = Router();
const nodemailer = require("nodemailer");
const PASS = process.env.EMAILPWD;

const sendMail = async (message) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "noreplybarbieshhhhh@gmail.com",
      pass: `${PASS}`,
    },
  });

  const info = await transporter.sendMail({
    from: "Ko-Manage, ticket-system, inc.",
    to: `${message.userEmail}`,
    subject: `${message.title}`,
    text: `Content: ${message.content}, Done: ${message.done}, Labels: ${message.labels}, Date created: ${message.creationTime}, Last updated: ${message.lastUpdated}`, // plain text body
  });

  console.log("Message sent: %s", info.messageId);
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
  await Ticket.findOneAndReplace({ title: data.title }, data);
  const allTickets = await Ticket.find({});
  sendMail(data);
  res.status(200).send(allTickets);
});

module.exports = communications;