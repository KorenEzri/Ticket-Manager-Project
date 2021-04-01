const { GraphQLScalarType } = require("graphql");
const Ticket = require("./mongo/models/ticket");
const User = require("./mongo/models/user");
const ValidationKey = require("./mongo/models/company-validation");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const { nanoid } = require("nanoid");
const saltRounds = 10;
const PASS = process.env.EMAILPWD;
let initialValidationKey;
let isValidated = false;

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
        return "OK";
      } else {
        return "There was a problem processing the request.";
      }
    },
    logIn: async (_, { username, password, validation }) => {
      try {
        let companyValidated = false;
        const attemptData = await ValidationKey.findOne({ username: username });
        const companyHash = attemptData.key;
        await bcrypt.compare(
          validation,
          companyHash,
          async function (err, result) {
            if (err) {
              console.log(err);
            }
            if (result == true) {
              console.log("Key validated successfully.");
              isValidated = true;
              companyValidated = true;
            } else if (result == false) {
              return `user not found`;
            }
          }
        );
        const findUser = await User.findOne({ username: username });
        const passwordHash = findUser.password;
        await bcrypt.compare(
          password,
          passwordHash,
          async function (err, result) {
            if (err) {
              console.log(err);
            }
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
              return `user not found`;
            }
          }
        );
      } catch (error) {
        console.error(error);
      }
    },
  },
  Mutation: {
    createValidationKey: async (_, { username }) => {
      initialValidationKey = nanoid();
      bcrypt.hash(initialValidationKey, saltRounds, async function (err, hash) {
        if (err) {
          console.error(err);
          return "ERROR";
        } else {
          const key = new ValidationKey({
            key: hash,
            username: username,
          });
          try {
            await ValidationKey.deleteOne({ username: username });
            await key.save();
            return "OK";
          } catch ({ message }) {
            console.log(message);
          }
        }
      });
    },
    //   addGroceryItem: async (_, { item }) => {
    //     try {
    //       const newGroceryItem = new GroceryItem({ item: item });
    //       await newGroceryItem.save();
    //       const groceryItemsArray = await GroceryItem.find({});
    //       return groceryItemsArray;
    //     } catch ({ message }) {
    //       console.log(message);
    //       return groceryItemsArray;
    //     }
    //   },
    //   addBasketItem: async (_, { item }) => {
    //     try {
    //       const newBasketItem = new BasketItem({
    //         item: item,
    //         amount: 1,
    //         isBought: false,
    //       });
    //       await newBasketItem.save();
    //       const basketItemsArray = await BasketItem.find({});
    //       return basketItemsArray;
    //     } catch {
    //       await BasketItem.findOneAndUpdate(
    //         { item: item },
    //         { $inc: { amount: 1 } },
    //         { new: true }
    //       );
    //       const basketItemsArray = await BasketItem.find({});
    //       return basketItemsArray;
    //     }
    //   },
    //   clearList: async (_, { list }) => {
    //     await list.deleteMany({});
    //   },
    //   deleteOne: async (_, args) => {
    //     try {
    //       if (args.list === BasketItem) {
    //         const relevantItem = await BasketItem.find({ item: `${args.item}` });
    //         if (relevantItem[0].amount === 1) {
    //           await args.list.deleteOne({ item: args.item });
    //         } else {
    //           await BasketItem.findOneAndUpdate(
    //             { item: args.item },
    //             { $inc: { amount: -1 } },
    //             { new: true }
    //           );
    //         }
    //         const basketItemsArray = await BasketItem.find({});
    //         return basketItemsArray;
    //       } else {
    //         await list.deleteOne({ item: item });
    //         const listItemArray = await list.find({});
    //         return listItemArray;
    //       }
    //     } catch ({ message }) {
    //       console.log(message);
    //     }
    //   },
    //   toggleBought: async (_, { item }) => {
    //     try {
    //       const relevantItem = await BasketItem.find({ item: item });
    //       relevantItem[0].isBought = !relevantItem[0].isBought;
    //       await BasketItem.replaceOne({ item: item }, relevantItem[0]);
    //       const allListItems = await BasketItem.find({});
    //       return allListItems;
    //     } catch ({ message }) {
    //       console.log(message);
    //     }
    //   },
  },
};

module.exports = { resolvers };
