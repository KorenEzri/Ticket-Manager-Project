const { Router } = require("express");
const tickets = require("./tickets");
const communications = require("./communications");
const api = Router();

api.use("/tickets", tickets);
api.use("/communications", communications);

module.exports = api;
