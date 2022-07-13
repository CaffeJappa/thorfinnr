const mongoose = require("mongoose");

const dataLSchema = mongoose.Schema({
  userID: String,
  lang: String,
})

module.exports = mongoose.model("DataL", dataLSchema);
