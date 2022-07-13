const mongoose = require("mongoose");

const dataMSchema = mongoose.Schema({
  nome: String,
  userID: String,
  lb: String,
  dinheiro: Number,
  banco: Number,
  data: Number,
  ipData: Number,
  robData: Number,
  salData: Number,
  lang: String,
})

module.exports = mongoose.model("DataM", dataMSchema);
