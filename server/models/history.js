const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Now = require("../Now");

const historySchema = new Schema({
  command: {
    type: String,
    required: true
  },
  result: {
    type: Number,
    required: true
  },
  date_added: {
    type: Date,
    default: Now.getLocalTime(new Date())
  }
});

module.exports = mongoose.model("History", historySchema);
