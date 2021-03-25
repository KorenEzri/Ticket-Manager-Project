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
  try {
    const requestedTickets = await Ticket.find(
      !searchText
        ? {}
        : {
            $or: [
              { title: { $regex: `${searchText}`, $options: "i" } },
              { labels: { $regex: `${searchText}`, $options: "i" } },
            ],
          }
    );
    res.status(200).send(requestedTickets);
  } catch ({ message }) {
    console.log(message);
    res.status(400).send("request failed");
  }
});

app.patch("/api/tickets/:tickedId/done", async (req, res) => {
  try {
    const { tickedId } = req.params;
    const foundTicket = await Ticket.findById(tickedId);
    const isDone = foundTicket.done;
    if (!isDone) {
      foundTicket.done = true;
      await Ticket.replaceOne({ _id: tickedId }, foundTicket);
      res.send({ updated: true });
    } else {
      res.send({ updated: false });
    }
  } catch ({ message }) {
    console.log(message);
    res.status(400).send("update failed");
  }
});

app.patch("/api/tickets/:tickedId/undone", async (req, res) => {
  try {
    const { tickedId } = req.params;
    const foundTicket = await Ticket.findById({ _id: tickedId });
    const isDone = foundTicket.done;
    if (isDone) {
      foundTicket.done = false;
      await Ticket.replaceOne({ _id: tickedId }, foundTicket);
      res.send({ updated: true });
    } else {
      res.send({ updated: false });
    }
  } catch ({ message }) {
    console.log(message);
    res.status(400).send("update failed");
  }
});

module.exports = app;
