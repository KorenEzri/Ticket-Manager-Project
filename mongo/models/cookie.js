const mongoose = require("mongoose");
const cookieSchema = new mongoose.Schema({
  cookie: { type: String, required: true, unique: true },
  value: { type: Number, required: true, unique: true },
  createdAt: { type: Date, expires: 2200, default: Date.now },
});

module.exports = mongoose.model("Cookie", cookieSchema);
