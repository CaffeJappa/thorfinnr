const mongoose = require("mongoose");

const dataMWSchema = mongoose.Schema({
  nome: String,
  guildID: String,
  userID: String,
  warns: Array,
});

module.exports = mongoose.model("DataMW", dataMWSchema);
