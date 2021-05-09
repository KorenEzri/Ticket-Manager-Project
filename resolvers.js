const { GraphQLScalarType } = require("graphql");
const Ticket = require("./mongo/models/ticket");
const User = require("./mongo/models/user");
const Cookie = require("./mongo/models/cookie");
const nodemailer = require("nodemailer");
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
    checkCookies: async (_, { cookie }) => {
      const currentCookie = await Cookie.findOne({ cookie: "loggedIn" });
      if (currentCookie && currentCookie.value === Number(cookie)) {
        return true;
      } else {
        return false;
      }
    },
  },
  Mutation: {
    updateTicket: async (
      _,
      {
        content,
        correspondences,
        done,
        userEmail,
        labels,
        title,
        creationTime,
        lastUpdated,
      }
    ) => {
      const ticket = {
        content,
        correspondences,
        done,
        userEmail,
        labels,
        title,
        creationTime,
        lastUpdated,
      };
      await Ticket.updateOne({ title: ticket.title }, ticket);
      const allTickets = await Ticket.find({});
      // sendMail(data);
      return allTickets;
    },
  },
};

module.exports = { resolvers };
