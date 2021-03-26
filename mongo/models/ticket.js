const mongoose = require("mongoose");
const ticketSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  correspondences: Array,
  userEmail: String,
  done: Boolean,
  creationTime: Date,
  lastUpdated: Date,
  labels: Array,
});

module.exports = mongoose.model("Ticket", ticketSchema);
