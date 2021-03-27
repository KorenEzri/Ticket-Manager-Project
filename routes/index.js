const { Router } = require("express");
const tickets = require("./tickets");
const communications = require("./communications");
const userManagement = require("./user-management");
const api = Router();

api.use("/tickets", tickets);
api.use("/communications", communications);
api.use("/usermanagement", userManagement);

module.exports = api;
