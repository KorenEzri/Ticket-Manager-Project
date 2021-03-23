const mongoose = require("mongoose");
const ticketSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  userEmail: String,
  done: Boolean,
  creationTime: Date,
  labels: Array,
});

ticketSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Ticket", ticketSchema);
