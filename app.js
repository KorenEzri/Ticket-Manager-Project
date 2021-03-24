const morgan = require("morgan");
const express = require("express");
const app = express();
app.use(morgan("tiny"));
app.use(express.static("client/build"));

const bodyParser = require("body-parser");
const Ticket = require("./mongo/models/ticket");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.get("/api/tickets", async (req, res) => {
  const { searchText } = req.query;
  if (searchText) {
    try {
      const requestedTickets = await Ticket.find({
        title: { $regex: `${searchText}`, $options: "i" },
      });
      res.status(200).send(requestedTickets);
    } catch ({ message }) {
      console.log(message);
      res.status(400).send("request failed");
    }
  } else {
    try {
      const allTickets = await Ticket.find({});
      res.status(200).send(allTickets);
    } catch ({ message }) {
      console.log(message);
      res.status(400).send("request failed");
    }
  }
});

app.patch("/api/tickets/:tickedId/done", async (req, res) => {
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

app.patch("/api/tickets/:tickedId/undone", async (req, res) => {
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

module.exports = app;
