const mongoose = require("mongoose");

const acDSchema = mongoose.Schema({
  nome: String,
  id: Number,
  preço: Number,
  tipo: String,
  desc: String,
})

module.exports = mongoose.model("acD", acDSchema);
