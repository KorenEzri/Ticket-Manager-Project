const { Router } = require("express");
const bodyParser = require("body-parser");
const Ticket = require("../mongo/models/ticket");
const mongoose = require("mongoose");
const tickets = Router();

tickets.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
tickets.use(bodyParser.json());

tickets.get("/:searchText", async (req, res) => {
  if (req.params) {
    const { searchText } = req.params;
    try {
      if (searchText) {
        const requestedTicketsFromDB = await Ticket.find({
          title: { $regex: searchText, $options: "i" },
        });
        res.status(200).send(requestedTicketsFromDB);
      } else {
        const allTickets = await Ticket.find({});
        res.status(200).send(allTickets);
      }
    } catch ({ message }) {
      console.log(message);
    }
  }
});

tickets.patch("/:tickedId/done", async (req, res) => {
  try {
    const { tickedId } = req.params;
    const foundTicket = await Ticket.find({ _id: tickedId });
    const isDone = foundTicket[0].done;
    if (!isDone) {
      foundTicket[0].done = true;
      await Ticket.replaceOne({ _id: tickedId }, foundTicket[0]);
    }
    res.send({ updated: true });
  } catch ({ message }) {
    console.log(message);
  }
});

tickets.patch("/:tickedId/undone", async (req, res) => {
  try {
    const { tickedId } = req.params;
    const foundTicket = await Ticket.find({ _id: tickedId });
    const isDone = foundTicket[0].done;
    if (isDone) {
      foundTicket[0].done = false;
      await Ticket.replaceOne({ _id: tickedId }, foundTicket[0]);
    }
    res.send({ updated: true });
  } catch ({ message }) {
    console.log(message);
  }
});

module.exports = tickets;
