const { Router } = require("express");
const tickets = require("./tickets");
const api = Router();

api.use("/tickets", tickets);

module.exports = api;
