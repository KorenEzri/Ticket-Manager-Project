require("dotenv").config();
const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan")
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
  // app.use(express.static("src/frontend"));
  app.use(express.static("client/build"));
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
  app.use(bodyParser.json());
  app.use(morgan("tiny"))
  
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  server.applyMiddleware({ app });
  await connectMongo();
  app.listen({ port: PORT }, () =>
    console.log(
      `Server is now running at http://localhost:3001${server.graphqlPath}`
    )
  );
};
startServer();