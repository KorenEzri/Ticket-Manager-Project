const morgan = require("morgan");
const express = require("express");
const app = express();
app.use(morgan("tiny"));
app.use(express.static("client/build"));
const api = require("./routes");
const bodyParser = require("body-parser");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.use("/api", api);

module.exports = app;
