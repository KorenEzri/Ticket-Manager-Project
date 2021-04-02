require("dotenv").config();
const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const morgan = require("morgan");
const mongoose = require("mongoose");
const { resolvers } = require("./resolvers");
const { typeDefs } = require("./typeDefs");

const env = process.env.NODE_ENV || "production";
const MONGO_URI = process.env[env === "test" ? "TEST_MONGO_URI" : "MONGO_URI"];
const PORT = process.env.PORT || 8080;

const connectMongo = async () => {
  console.log("Connecting to MongoDB");
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
      useCreateIndex: true,
    });
    console.log("Connected to MongoDB");
  } catch ({ message }) {
    console.log(message);
  }
};
const startServer = async () => {
  const app = express();
  app.use(cookieParser());
  app.use(
    cors({
      allowedHeaders: ["Content-Type"],
      origin: "*",
      preflightContinue: true,
    })
  );
  app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With,content-type"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
  });
  app.use(express.static("client/build"));
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
  app.use(bodyParser.json());
  app.use(morgan("tiny"));
  const server = new ApolloServer({
    context: ({ req, res }) => ({ req, res }),
    playground: {
      settings: {
        "request.credentials": "include",
      },
    },
    typeDefs,
    resolvers,
  });
  server.applyMiddleware({ app });
  await connectMongo();
  app.listen({ port: PORT }, () =>
    console.log(
      `Server is now running at http://localhost:${PORT}${server.graphqlPath}`
    )
  );
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/client/build/index.html"));
  });
};
startServer();
