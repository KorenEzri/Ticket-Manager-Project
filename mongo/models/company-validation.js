const mongoose = require("mongoose");
const validationKeySchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  createdAt: { type: Date, expires: 900, default: Date.now },
});

module.exports = mongoose.model("ValidationKey", validationKeySchema);
