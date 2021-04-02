const { GraphQLScalarType } = require("graphql");
const Ticket = require("./mongo/models/ticket");
const User = require("./mongo/models/user");
const Cookie = require("./mongo/models/cookie");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const PASS = process.env.EMAILPWD;

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

const dateScalar = new GraphQLScalarType({
  name: "Date",
  parseValue(value) {
    return new Date(value);
  },
  serialize(value) {
    return value.toISOString();
  },
});
const resolvers = {
  Date: dateScalar,
  Query: {
    allTickets: async () => {
      try {
        const tickets = await Ticket.find({});
        return tickets;
      } catch ({ message }) {
        console.log(message);
      }
    },
    searchTickets: async (_, { input }) => {
      try {
        const tickets = await Ticket.find({
          $or: [
            { title: { $regex: `${input}`, $options: "i" } },
            { labels: { $regex: `${input}`, $options: "i" } },
          ],
        });
        return tickets;
      } catch ({ message }) {
        console.log(message);
      }
    },
    requestAndSendValidationKey: async (_, { username }) => {
      const foundUser = await User.findOne({ username });
      if (foundUser) {
        const message = {
          userEmail: "cyber4sdummyaddress@gmail.com",
          title: "Your company validation key",
          content: `Hello. The following is your company validation key for the user ${username}. The key will be valid for fifteen minutes. Please do not share or expose your key in any way. \n \n${initialValidationKey}
        Best regards, \n 
        Ko-manage`,
        };
        sendMail(message, "true");
        return "OK";
      } else {
        return "There was a problem processing the request.";
      }
    },
    login: async (_, { username, password }, { req, res }) => {
      try {
        const findUser = await User.findOne({ username });
        const passwordHash = findUser.password;
        const result = await bcrypt.compare(password, passwordHash);
        if (result == true) {
          const cookieName = "loggedIn";
          const random = Math.floor(Math.random() * 121);
          const newCookie = new Cookie({
            cookie: "loggedIn",
            value: random,
          });
          try {
            await Cookie.deleteOne({ cookie: "loggedIn" });
            await newCookie.save();
            await res.cookie(cookieName, random, {
              maxAge: 2200000,
              httpOnly: false,
            });
            return "OK";
          } catch ({ message }) {
            console.log(message);
          }
        } else if (result == false) {
          return "user not found";
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
  Mutation: {
    register: async (_, { email, firstName, lastName, username, password }) => {
      try {
        const hash = await bcrypt.hash(password, 10);
        password = hash;
        const user = new User({
          email,
          firstName,
          lastName,
          username,
          password,
        });
        console.log(user);
        await user.save();
        return "OK";
      } catch ({ message }) {
        console.log(message);
        return `${message}`;
      }
    },
  },
};

module.exports = { resolvers };
