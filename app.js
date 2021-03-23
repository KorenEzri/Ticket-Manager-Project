const morgan = require("morgan");
const express = require("express");
const app = express();
const api = require("./routes");
app.use(morgan("tiny"));
app.use(express.static("client/build"));
app.use("/api", api);

module.exports = app;
