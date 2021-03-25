const { Router } = require("express");
const bodyParser = require("body-parser");
const Ticket = require("../mongo/models/ticket");
const tickets = Router();

tickets.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
tickets.use(bodyParser.json());

tickets.get("/:searchText", async (req, res) => {
  const { searchText } = req.params.searchText;
  try {
    const requestedTicketsFromDB = await Ticket.find({
      $or: [
        { title: { $regex: `${searchText}`, $options: "i" } },
        { labels: `${searchText}` },
      ],
    });
    res.status(200).send(requestedTicketsFromDB);
  } catch ({ message }) {
    res.status(400).send("request failed");
    console.log(message);
  }
});

tickets.get("/", async (req, res) => {
  try {
    const allTickets = await Ticket.find({});
    res.status(200).send(allTickets);
  } catch ({ message }) {
    console.log(message);
    res.status(400).send("request failed");
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
    res.status(400).send("update failed");
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
    res.status(400).send("update failed");
  }
});

module.exports = tickets;
