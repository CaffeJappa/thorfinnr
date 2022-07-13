const mongoose = require("mongoose");
const botconfig = require("../../botconfig.json");


// CONECTAR A DATABASE
mongoose.connect(botconfig.mongoPass, {
  useNewUrlParser: true,
  useUnifiedTopology: false,
});

//MODELOS
const Data = require("../../modelos/data.js");

module.exports.run = async (bot, message, args) => {

  // Verificar Qtd
  if(!args[0]) return message.channel.send("Por favor, especifique uma quantidade.");

  // Verificar dinheiro
  if(parseInt(args[0]) < 1) return message.channel.send("Não é possível depositar.");
  if(isNaN(parseInt(args[0]))) return message.channel.send("Isso não é um número.");

    Data.findOne({
      userID: message.author.id
    }, (err, data) => {
      if(err) console.log(err);
      if(parseInt(args[0]) > data.dinheiro) return message.channel.send("Estás sem dinheiro.");
      if(parseInt(args[0]) < 1) return message.channel.send("Não é possível depositar.");

      if(!data) {
        return message.channel.send("Estás sem dinheiro.")
      } else {
        data.dinheiro -= parseInt(args[0]);
        data.banco += parseInt(args[0]);
        data.save().catch(err => console.log(err));
      }
      return message.channel.send(`${message.author} depositou R$${args[0].toLocaleString()}.`);
    })

}

module.exports.help = {
  name: "depositar",
  aliases: ["dep"],
  description: "Depositará dinheiro no banco.",
  category: "economia",
  use: "[Dinheiro]"
}
